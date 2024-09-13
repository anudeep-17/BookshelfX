import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";
 

export async function DELETE(req: Request) 
{
    try{
        const url = new URL(req.url);
        const title = url.searchParams.get('title');
        const authors = url.searchParams.get('authors');
         
        if(title == null || authors == null) 
        {
            return NextResponse.json({success: false, message: "All fields are required"}, {status: 400});
        }
        const authorsArray = authors ? authors.split(",") : undefined;

        
        const book = await database.bookDetails.findFirst({
            where: {
                title: title,
                authors: {
                    hasSome: authorsArray
                }
            }
        });
        
        if(book)
        {
            await database.bookRentalDetails.deleteMany({
                where: {
                    bookId: book.id
                }
            });
        
            await database.bookReview.deleteMany({
                where: {
                    bookId: book.id
                }
            });        
        
            await database.favoriteBook.deleteMany({
                where: {
                    bookId: book.id
                }
            });
        
            const deleteBook = await database.bookDetails.delete({
                where: {
                    id: book.id
                } 
            });
            
         

            if(!deleteBook)
            {
                return NextResponse.json({success: false, message: "No books found to delete"}, {status: 404});
            }

            return NextResponse.json({success: true, message:"All books deleted successfully"}, {status: 200});
        }
        else
        {
            return NextResponse.json({success: false, message: "No books found to delete"}, {status: 404});
        }
    }
    catch(err)
    {
        console.error(err);
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}