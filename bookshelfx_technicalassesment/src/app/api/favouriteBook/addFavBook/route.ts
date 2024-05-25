import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";

export async function POST(req: Request) 
{
    try{
        const { userId, bookId } = await req.json();
        console.log("userId: ", userId, "bookId: ", bookId);

        // Check if user exists
        const user = await database.user.findUnique({ where: { id: Number(userId) } });
        console.log("user: ", user);
        if (!user) return NextResponse.json({success: false, message: "User not found"}, {status: 404});

        // Check if book exists
        const book = await database.bookDetails.findUnique({ where: { id: Number(bookId) } });
        console.log("book: ", book);
        if (!book) return NextResponse.json({success: false, message: "Book not found"}, {status: 404});
      
        const favBook = await database.favoriteBook.create({
            data: {
                userId,
                bookId
            }
        });
        return NextResponse.json({success: true, data: favBook},{status : 200});
    }
    catch(err){
        console.error(err);
        return NextResponse.json({success: false, message: err},{status : 500});
    }
}