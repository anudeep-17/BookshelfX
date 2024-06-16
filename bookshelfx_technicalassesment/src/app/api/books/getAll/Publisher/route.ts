import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";
 
export async function GET() 
{
    try{
        const result = await database.bookDetails.findMany(
            {
                select: {
                    publisher: true
                }
            }
        );

 
        const publishers = result.map(r => r.publisher);
        const uniquePublishers = Array.from(new Set(publishers));
        if (uniquePublishers.length === 0) {
            return NextResponse.json({success: false, message: "No publishers available"}, {status: 404});
        }
        return NextResponse.json({success: true, data: uniquePublishers}, {status: 200});
        
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
    
}