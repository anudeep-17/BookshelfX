import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";

export async function GET(req:Request) 
{
    try
    {   
        const url = new URL(req.url || '');
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');

        const result = await database.bookDetails.findMany({
            where: {
                isFeaturedBook: true
            },
            include: {
                rentals: true,
                reviews: true,
                favoritedBy: true
            },
            skip: (page-1) * limit,
            take: limit
        });

        if (result.length === 0) 
        {
            return NextResponse.json({success: false, message: "No featured books available"}, {status: 404});
        }

        return NextResponse.json({success: true, data: result}, {status: 200}); 
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}