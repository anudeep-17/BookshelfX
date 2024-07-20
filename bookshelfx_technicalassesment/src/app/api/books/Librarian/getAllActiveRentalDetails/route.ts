import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";

export async function GET(req: Request) 
{
    try
    {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const rowsPerPage = parseInt(url.searchParams.get("rowsPerPage") || "10");
            const allActiveRentalCount = await database.bookDetails.count({
            where: {
                availability: false
            }
        });
    

        const allRentalDetails = await database.bookRentalDetails.findMany({
            where: {
                returned: false,
            },
            include: {
                book: true,
                user: true
            },
            skip: (page - 1) * rowsPerPage,
            take: rowsPerPage
        });

        if(!allRentalDetails || allActiveRentalCount < 0)
        {
            return NextResponse.json({success: false, message: "No active rentals found", totalCount: 0}, {status: 404});
        }
        console.log( allRentalDetails,   allActiveRentalCount);
        return NextResponse.json({success: true, data: allRentalDetails, totalCount: allActiveRentalCount}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}