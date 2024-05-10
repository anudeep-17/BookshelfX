import { Book } from "@/Components/interfaceModels";
import customerReviews from "./RandomCustomerReviews.json";
import BookCategories from "./BookCategoriesCatalog.json";
 


function customerreviewexporter(customerReviews: any[]) {
    const customerReviewsArray: any[] = [];
    customerReviews.map((review: {review: string}) => {
        customerReviewsArray.push(review.review);
    })
    return customerReviewsArray;
}

export async function AddGoogleBooksToDB()
{
    BookCategories.bookCategories.map(async (bookCategory: string) => {
            const response = await fetch(`/api/books/getBooksofCategoryFromGoogleapi?category=${bookCategory}`,{
                method: 'GET'
            });
            const customerReviewsArray = customerreviewexporter(customerReviews);
            
            response.json().then((data: any) => {
                data.items.map(async (book: any) => {
                const bookData: Book = {
                    ISBN: book.volumeInfo.industryIdentifiers[0].identifier? book.volumeInfo.industryIdentifiers[0].identifier : "N/A",
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors,
                    publisher: book.volumeInfo.publisher,
                    publishedDate: book.volumeInfo.publishedDate,
                    description: book.volumeInfo.description,
                    pagecount: book.volumeInfo.pageCount,
                    category: bookCategory,
                    rating: book.volumeInfo.averageRating,
                    coverimage: book.volumeInfo.imageLinks.thumbnail,
                    customerReviews: customerReviewsArray,
                    availability: true,  
                }
                const addbooks = await fetch(`/api/books/addBook`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookData)
                });
                const addbooksResponse = await addbooks.json();
                if (!addbooksResponse.success) 
                {
                    console.log(`Error adding book: ${bookData.title}`);
                }
                });
        });
    });
}