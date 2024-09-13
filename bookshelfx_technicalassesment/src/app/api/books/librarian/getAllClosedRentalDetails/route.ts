import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";

export async function GET(req: Request) 
{
    try
    {
        const url = new URL(req.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const rowsPerPage = Number(url.searchParams.get("rowsPerPage")) || 10;
        
        const allRentalCounts = await database.bookRentalDetails.count({
            where: {
                returned: true
            }
        });

        const allRentalDetails = await database.bookRentalDetails.findMany({
            where: {
                returned: true
            },
            include: {
                book: true,
                user: true
            },
            skip: (page - 1) * rowsPerPage,
            take: rowsPerPage
        });
        
        if(!allRentalDetails || allRentalCounts < 0)
        {
            return NextResponse.json({success: false, message: "No rentals found"}, {status: 404});
        }

        return NextResponse.json({success: true, data: allRentalDetails, totalRentals: allRentalCounts}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}