import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";

export async function GET(req: Request)
{
    try
    {
        const url = new URL(req.url || '');
        const id = url.searchParams.get('id');

        if(!id)
        {
            return NextResponse.json({success: false, message: "ID not provided"}, {status: 400});
        }

        const book = await database.bookDetails.findUnique({
            where: {
                id: Number(id) 
            }
        });

        if (!book) {
            return NextResponse.json({success: false, message: "Book not found"}, {status: 404});
        }
        
        return NextResponse.json({success: true, data: book}, {status: 200});
    
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }

}