import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";

export async function DELETE(req: Request) 
{
    try{
        const deleteBooks = await database.bookRentalDetails.deleteMany();

        if(!deleteBooks)
        {
            return NextResponse.json({success: false, message: "No books found to delete"}, {status: 404});
        }

        return NextResponse.json({success: true, message:"All books deleted successfully"}, {status: 200});
    }
    catch(err)
    {
        console.error(err);
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}