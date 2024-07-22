import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";
 
export async function GET() 
{
    try{
        const result = await database.bookDetails.findMany(
            {
                select: {
                    category: true
                }
            }
        );

 
        const categories = result.map(r => r.category);
        const uniqueCategories = Array.from(new Set(categories));
        if (uniqueCategories.length === 0) {
        return NextResponse.json({success: false, message: "No categories available"}, {status: 404});
        }

        return NextResponse.json({success: true, data: uniqueCategories}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
    
}