import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";

export async function GET(req: Request)
{
    try
    {
        const url = new URL(req.url || '');
        console.log(url.searchParams.get('category'));
        const category = url.searchParams.get('category');
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '7');
        

        if(!category){
            return NextResponse.json({success: false, message: "Category not provided"}, {status: 400});
        }
        
        const books = await database.bookDetails.findMany({
            where: {
                category: category
            },
            include:
            {
                reviews: true,
                rentals: true,
            },
            skip: (page-1) * limit,
            take: limit
        });
    
        
        if(!books){
            return NextResponse.json({success: false, message: "Book not found"}, {status: 404});
        }
        console.log(books);
        return NextResponse.json({success: true, message: "Book found", data:books}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
    
}