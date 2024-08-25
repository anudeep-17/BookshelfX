import { NextResponse } from "next/server";
import { database } from "@/app/api/prismaConfig";
 
export async function POST(req: Request)
{ 
    try{
        const {bookID, userID} = await req.json();

        const isbookrentedByUserPreviously = await database.bookRentalDetails.findFirst({
            where: {
                bookId: bookID,
                userId: userID,
                returned: true,
            }
        });

        if(isbookrentedByUserPreviously)
        {
            return NextResponse.json({success: true, message: "Book is rented by the user previously"}, {status: 200});
        }
        else
        {
            return NextResponse.json({success: false, message: "Book is not rented by the user previously"}, {status: 200});
        }
    }
    catch(e)
    {
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}