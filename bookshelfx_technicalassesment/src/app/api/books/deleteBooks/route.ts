import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";

export async function DELETE(req: Request) 
{
    try{
        const { id } = await req.json();

        const deleteBook = await database.bookDetails.delete({
            where: {
                id: id
            }
        });

        if(!deleteBook)
        {
            return NextResponse.json({success: false, message: "Book not found"}, {status: 404});
        }

        return NextResponse.json({success: true, message:"Book deleted successfully", book:deleteBook}, {status: 200});
    }
    catch(err)
    {
        console.error(err);
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}