import { database } from "@/app/api/prismaConfig";
import { NextResponse } from "next/server";

export async function GET(req: Request)
{
    try{
        const count = await database.bookDetails.count({
            where: {
                isFeaturedBook: true
            }
        });
        if (count === 0) {
            return NextResponse.json({success: false, message: "No featured books available"}, {status: 404});
        }
        console.log("count: ", count);  
        return NextResponse.json({success: true, data: count}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}