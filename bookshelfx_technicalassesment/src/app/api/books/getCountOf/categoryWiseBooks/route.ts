import { database } from "@/app/api/prismaConfig";
import { NextResponse } from "next/server";

export async function GET(req: Request)
{
    try{
        const url = new URL(req.url);
        const category = url.searchParams.get("category");
        
        if(!category) return NextResponse.json({success: false, message: "Category not found"}, {status: 404})

        const count = await database.bookDetails.count({
            where: {
                category: category
            }
        });
        if (count === 0) {
            return NextResponse.json({success: false, message: "No featured books available"}, {status: 404});
        }
        return NextResponse.json({success: true, data: count}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}