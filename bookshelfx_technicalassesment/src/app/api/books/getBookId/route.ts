import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";

export async function GET(req: Request)
{
    const url = new URL(req.url || '');
    const ISBN  = url.searchParams.get('ISBN');

    if(!ISBN){
        return NextResponse.json({success: false, message: "ISBN is required"}, {status: 400});
    }

    const book = await database.bookDetails.findFirst({
        where: {
          ISBN: ISBN
        },
        select: {
          id: true
        }
      });

    if(!book){
        return NextResponse.json({success: false, message: "Book not found"}, {status: 404});
    }

    return NextResponse.json({success: true, message: "Book found", book}, {status: 200});
    
}