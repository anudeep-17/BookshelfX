import { database } from "@/app/api/prismaConfig";
import { NextResponse } from "next/server";

export async function GET(req: Request)
{
   
    try{
        const url = new URL(req.url || '');
        const LibrarianId = url.searchParams.get('LibrarianId');
    
        //total number of books
        const totalBooks = await database.bookDetails.count();
        const totalUsers = await database.user.count();
        //total number of rented books vs total available books
        const rentedBooks = await database.bookDetails.count({
            where: {
                availability: false
            }
        });

        const availableBooks = await database.bookDetails.count({
            where: {
                availability: true,
            }
        });

        //Category wise numbers of books.
        const categoryWiseBooks = await database.bookDetails.groupBy({
            by: ['category'],
            _count: { 
                category: true 
            }
        });
        
        //Number of fav books for each category
        const favoriteBooks = await database.favoriteBook.findMany({
            include: {
                book: true
            }
        });
        
        let categoryWiseFavBooks: { [key: string]: number } = {};
        const categoryCounts = favoriteBooks.reduce((counts, favoriteBook) => {
            const category = favoriteBook.book.category;
            categoryWiseFavBooks[category] = (categoryWiseFavBooks[category] || 0) + 1;
            return counts;
        }, {});

        //Number of overdues books with data
         const overdueBooks = await database.bookRentalDetails.findMany({
            where:{
                isOverdue: true
            }
         })
         
         let librarianClosedRentals;
         if(LibrarianId)
         {
            librarianClosedRentals = await database.user.findUnique({
                 where: {
                     id: Number(LibrarianId)
                 },
                 select: {
                     authorizedRentals: {
                         select: {
                              returnDate: true,
                         },
                     },
                 },
             }).then(librarian => {
                const rentalsByMonth = librarian?.authorizedRentals.reduce((acc: {[key: number]: number}, rental) => {
                    const month = new Date(rental.returnDate).getMonth();
                    if (!acc[month]) {
                        acc[month] = 0;
                    }
                    acc[month]++;
                    return acc;
                }, {});
            
                return rentalsByMonth;
            });
         }

        return NextResponse.json({
            success: true,
            data: {
                totalBooks,
                totalUsers,
                rentedBooks,
                availableBooks,
                categoryWiseBooks,
                categoryWiseFavBooks,
                overdueBooks,
                librarianClosedRentals
            }}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}