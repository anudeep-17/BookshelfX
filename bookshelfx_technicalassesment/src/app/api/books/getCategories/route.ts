import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
 
export async function GET() 
{
    try{
        const categories = await database.bookDetails.findMany(
            {
                select: {
                    category: true
                }
            }
        );

        if (categories.length === 0) {
            return NextResponse.json({success: false, message: "No categories available"}, {status: 404});
        }
        return NextResponse.json({success: true, data: categories}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
    
}