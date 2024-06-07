import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";

export async function DELETE(req: Request) 
{
    try{
        const { userId, bookId } = await req.json();
        const favBook = await database.favoriteBook.delete({
            where: {
                userId_bookId: {
                    userId,
                    bookId
                }
            }
        });
        return NextResponse.json({success: true, data: favBook},{status : 200});
    }
    catch(err){
        console.error(err);
        return NextResponse.json({success: false, message: err},{status : 500});
    }

}