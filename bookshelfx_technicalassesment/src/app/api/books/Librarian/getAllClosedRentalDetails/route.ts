import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";

export async function GET(req: Request) 
{
    try
    {
        const allRentalDetails = await database.bookRentalDetails.findMany({
            where:
            {
                returned: true
            },
            include: {
                book: true,
                user: true
            }
        });
        if(!allRentalDetails)
        {
            return NextResponse.json({success: false, message: "No active rentals found"}, {status: 404});
        }
        return NextResponse.json({success: true, data: allRentalDetails}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}