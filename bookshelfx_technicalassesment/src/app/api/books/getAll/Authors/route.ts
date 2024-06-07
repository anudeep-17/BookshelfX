import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";
 
export async function GET(req: Request)
{
    try{
        const authors = await database.bookDetails.findMany(
            {
                select: {
                    authors: true
                }
            }
        );
        if (authors.length === 0) {
            return NextResponse.json({success: false, message: "No authors available"}, {status: 404});
        }
        return NextResponse.json({success: true, data: authors}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}