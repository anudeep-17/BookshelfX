import { NextResponse } from "next/server";
import { database } from "../prismaConfig";


export async function DELETE(req: Request) 
{
    try{
        await database.bookReview.deleteMany();
        await database.favoriteBook.deleteMany();
        await  database.bookRentalDetails.deleteMany();
        await database.bookDetails.deleteMany();
        await database.user.deleteMany();
        return NextResponse.json({success: true, message:"All data deleted successfully"}, {status: 200});
    }
    catch(err)
    {
        console.error(err);
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}