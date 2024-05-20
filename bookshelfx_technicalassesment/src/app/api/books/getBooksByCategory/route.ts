import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";

export async function GET(req: Request)
{
    const url = new URL(req.url || '');
    const category = url.searchParams.get('category');

    if(!category){
        return NextResponse.json({success: false, message: "Category not provided"}, {status: 400});
    }

    const books = await database.bookDetails.findMany({
        where: {
            category: category
        }
    });

    
    if(!books){
        return NextResponse.json({success: false, message: "Book not found"}, {status: 404});
    }

    return NextResponse.json({success: true, message: "Book found", books}, {status: 200});
    
}