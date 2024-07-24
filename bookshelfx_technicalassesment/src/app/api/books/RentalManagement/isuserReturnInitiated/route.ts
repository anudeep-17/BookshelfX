import { NextResponse } from "next/server";
import { database } from "@/app/api/prismaConfig";
 
export async function POST(req: Request)
{ 
    try{
        const {bookID} = await req.json();

        if(!bookID)
        {
            return NextResponse.json({success: false, message: "Missing required fields"}, {status: 400});
        }

        const isbookrentedbycurrentuser = await database.bookRentalDetails.findFirst({
            where: {
                bookId: bookID,
                returned: false,
                userInitiatedReturn: true
            }
        });

        if(isbookrentedbycurrentuser)
        {
            return NextResponse.json({success: true, message: "Book is rented by the current user"}, {status: 200});
        }
        else
        {
            return NextResponse.json({success: false, message: "Book is not rented by the current user"}, {status: 200});
        }
    }
    catch(e)
    {
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}