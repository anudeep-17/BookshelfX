import { PrismaClient } from '@prisma/client'

import BookCategories from './BookCategoriesCatalog.json';
import customerReviews from './RandomCustomerReviews.json';
import { Book } from '@/Components/interfaceModels';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import { promisify } from 'util'; 
import { join } from 'path';
import bycrpt from 'bcrypt';
//npx prisma migrate dev 
//npx prisma db seed

const writeFile = promisify(fs.writeFile);
const prisma = new PrismaClient();

async function CreateUsers()
{
    let userData = '';
    const names = faker.helpers.uniqueArray(() => faker.person.fullName(), 20);
    const emails = faker.helpers.uniqueArray(faker.internet.email, 20);
    const passwords = faker.helpers.uniqueArray(faker.internet.password, 20);

    for (let i = 0; i < 20; i++) {
        const role = faker.helpers.arrayElement(['librarian', 'customer']);
        const Avatar =  `https://avatar.iran.liara.run/public`
        const favoriteCategories = faker.helpers.shuffle(BookCategories.bookCategories).slice(0, 6);
        userData += `Email: ${emails[i]}, Name: ${names[i]}, Password: ${passwords[i]}, Role: ${role}, \t\t  Avatar: ${Avatar}, \t\t Favourite Categories: ${favoriteCategories.join(", ")}\n`;

        await prisma.user.create({
            data: {
                email: emails[i],
                name: names[i],
                password : await bycrpt.hash(passwords[i], 10),
                role,
                Avatar: Avatar,
                favoriteCategories: {
                    set: favoriteCategories
                }
            },
        });

        await writeFile(join(__dirname, 'userData.txt'), userData);
    }
    console.log('\t\tFetched user data');
}

async function fetchWithRetry(url: string | URL | Request, options: RequestInit | undefined, retries = 3, backoff = 300) {
    const response = await fetch(url, options);
    if (!response.ok) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        } else {
            throw new Error(`Request failed after ${retries} retries`);
        }
    }
    return response.json();
}

async function CreateBooks() {
    for (const bookCategory of BookCategories.bookCategories) {
        const data = await fetchWithRetry(`https://www.googleapis.com/books/v1/volumes?q=subject:${bookCategory}&maxResults=10&key=${process.env.GOOGLE_BOOKS_API_KEY}`, { method: 'GET' });
        console.log(`\t\tFetching books for category: ${bookCategory}`);
        const books = data.items;
        if (!books) {
            console.log(`No books found for category: ${bookCategory}`);
            continue;
        }
        console.log(`\t\tTotal books found: ${books.length}`);

        await Promise.all(books.map(async (book: any) => {
            const isFeaturedBook = faker.helpers.arrayElement([false, true]);
            const bookData: Book = {
                ISBN: book.volumeInfo?.industryIdentifiers && book.volumeInfo.industryIdentifiers[0]?.identifier ? book.volumeInfo.industryIdentifiers[0].identifier : "N/A",
                title: book.volumeInfo?.title ? book.volumeInfo.title : "N/A",
                authors: book.volumeInfo?.authors ? book.volumeInfo.authors : ["N/A"],
                publisher: book.volumeInfo?.publisher ? book.volumeInfo.publisher : "N/A",
                publishedDate: book.volumeInfo?.publishedDate ? new Date(book.volumeInfo.publishedDate) : new Date(),
                description: book.volumeInfo?.description ? book.volumeInfo.description : "N/A",
                pagecount: book.volumeInfo?.pageCount ? book.volumeInfo.pageCount : 0,
                category: bookCategory,
                rating: book.volumeInfo?.averageRating ? book.volumeInfo.averageRating : 0,
                coverimage: book.volumeInfo?.imageLinks?.thumbnail ? book.volumeInfo.imageLinks.thumbnail : "N/A",
                availability: true,
                isFeaturedBook: isFeaturedBook,
            }

            try {
                const bookDataResponse = await prisma.bookDetails.create({
                    data: bookData
                });
            } catch (error: any) {
                if (error.code === 'P2002') {
                    console.log(`\t\tSkipping book with title "${bookData.title}" and authors "${bookData.authors}" because it already exists in the database.`);
                } else {
                    console.error(error);
                }
            }
        }));

        // Wait for 1 second before the next request
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('\t\tFetched book data');
}

async function CreateBookRentalDetails()
{
        const allusers = await prisma.user.findMany();
        const books = await prisma.bookDetails.findMany();
        const users = allusers.filter(allusers => allusers.role === 'customer');
        const librarians = allusers.filter(allusers => allusers.role === 'librarian');
        
        const bookRentalHistory: Record<number, {rentalDate: Date, returnDate: Date}> = {};

        for (let i = 0; i < 200; i++) {
            const user = faker.helpers.arrayElement(users);
            const book = faker.helpers.arrayElement(books);
            const librarian = faker.helpers.arrayElement(librarians);
        
            const rentalDate = faker.date.recent({days: 30});
            const returnDate = faker.date.between({from: rentalDate, to: Date.now()});
        
            if (bookRentalHistory[book.id]) {
                const previousRental = bookRentalHistory[book.id];
                if (rentalDate.getTime() > previousRental.returnDate.getTime() || returnDate.getTime() < previousRental.rentalDate.getTime()) {
                    continue;
                }
            }
        
            const daysDifference = Math.ceil(Math.abs(returnDate.getTime() - rentalDate.getTime()) / (1000 * 60 * 60 * 24));
            const isOverdue = daysDifference > 5;
            const returned = returnDate.getTime() < Date.now();
        
            await prisma.bookRentalDetails.create({
                data: {
                    userId: user.id,
                    bookId: book.id,
                    rentalDate,
                    returnDate,
                    isOverdue,
                    returned,
                    librarianId: returned ? librarian.id : null,
                },
            });
        
            if (returned) {
                await prisma.bookDetails.update({
                    where: { id: book.id },
                    data: { availability: true },
                });
            }
        
            // Update the rental history for this book
            bookRentalHistory[book.id] = { rentalDate, returnDate };
        }
        console.log('\t\tFetched book rental details');
}

async function CreateFavoriteBooks()
{
    const allusers = await prisma.user.findMany();
    const users = allusers.filter(allusers => allusers.role === 'customer');
    const books = await prisma.bookDetails.findMany();

    const userBookPairs = new Set();

    for (let i = 0; i < 100; i++) {
        const user = faker.helpers.arrayElement(users);
        const book = faker.helpers.arrayElement(books);

        const userBookPair = `${user.id}-${book.id}`;

        if (userBookPairs.has(userBookPair)) {
            // This user has already favorited this book, skip to the next iteration
            continue;
        }

        userBookPairs.add(userBookPair);

        await prisma.favoriteBook.create({
            data: {
                userId: user.id,
                bookId: book.id,
            },
        });
    }
    console.log('\t\tFetched favorite books');
}

async function CreateCustomerReviews()
{
    const allusers = await prisma.user.findMany();
    const users = allusers.filter(allusers => allusers.role === 'customer');
    const books = await prisma.bookDetails.findMany();
    
    const userBookPairs = new Set();
    
    for (let i = 0; i < 200; i++) {
        const user = faker.helpers.arrayElement(users);
        const book = faker.helpers.arrayElement(books);
        const review = faker.helpers.arrayElement(customerReviews);
        const rating = faker.number.int({min:0, max:5});
    
        const userBookPair = `${user.id}-${book.id}`;
    
        if (userBookPairs.has(userBookPair)) {
            // This user has already reviewed this book, skip to the next iteration
            continue;
        }
    
        userBookPairs.add(userBookPair);
    
        await prisma.bookReview.create({
            data: {
                userId: user.id,
                bookId: book.id,
                review: review.review,
                rating,
            },
        });
    }
    console.log('\t\tFetched customer reviews');
}

async function main() 
{
    await prisma.$connect();
    console.log('Connected to the database');

    console.log('Creating User data');
    await CreateUsers();
    console.log('Users created successfully and details written in /prisma/userData.txt file');
    console.log();

    console.log('Creating Book data');
    await CreateBooks();
    console.log('Books created successfully');
    console.log();

    console.log('Creating Book rental details');
    await CreateBookRentalDetails();
    console.log('Book rental details created successfully');
    console.log();

    console.log('Creating Favorite books');
    await CreateFavoriteBooks();
    console.log('Favorite books created successfully');
    console.log();

    console.log('Creating Customer reviews');
    await CreateCustomerReviews();
    console.log('Customer reviews created successfully');
    console.log();

}

  
  main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })