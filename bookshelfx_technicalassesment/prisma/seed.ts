import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import BookCategories from './BookCategoriesCatalog.json';
import customerReviews from './RandomCustomerReviews.json';
import { Book } from '@/Components/interfaceModels';

function customerreviewexporter(customerReviews: any[]) {
    const customerReviewsArray: any[] = [];
    customerReviews.map((review: {review: string}) => {
        customerReviewsArray.push(review.review);
    })
    return customerReviewsArray;
}

async function main() 
{
    const customerReviewsArray = customerreviewexporter(customerReviews);

    //inserting books for each category 
    BookCategories.bookCategories.map(async (bookCategory: string) => {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${bookCategory}&maxResults=6&key=${process.env.GOOGLE_BOOKS_API_KEY}`,{
            method: 'GET'
        });        
        const data = await response.json();
        const books = data.items;
        books.map(async (book: any) => {
            const bookData: Book = {
                ISBN: book.volumeInfo.industryIdentifiers[0].identifier? book.volumeInfo.industryIdentifiers[0].identifier : "N/A",
                title: book.volumeInfo.title? book.volumeInfo.title : "N/A",
                authors: book.volumeInfo.authors? book.volumeInfo.authors : ["N/A"],
                publisher: book.volumeInfo.publisher? book.volumeInfo.publisher : "N/A",
                publishedDate: book.volumeInfo.publishedDate? new Date(book.volumeInfo.publishedDate) : new Date(),
                description: book.volumeInfo.description? book.volumeInfo.description : "N/A",
                pagecount: book.volumeInfo.pageCount? book.volumeInfo.pageCount : 0,
                category: bookCategory,
                rating: book.volumeInfo.averageRating? book.volumeInfo.averageRating : 0,
                coverimage: book.volumeInfo.imageLinks?.thumbnail? book.volumeInfo.imageLinks.thumbnail : "N/A",
                customerReviews: customerReviewsArray,
                availability: true,  
            }

            try {
            const bookDataResponse = await prisma.bookDetails.create({
                data: bookData
                });
            } catch (error: any) {
                if (error.code === 'P2002') {
                    console.log(`Skipping book with title "${bookData.title}" and authors "${bookData.authors}" because it already exists in the database.`);
                } else {
                    console.error(error);
                }
            }
        })
    })
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