import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";

export async function GET(req: Request)
{
    try{
        const url = new URL(req.url || '');
        const category = url.searchParams.get('category');
        const author = url.searchParams.get('author');
        const title = url.searchParams.get('title');
    
        const query: { category?: string, author?: string, title?: string } = {};
        if (category) query.category = category;
        if (author) query.author = author;
        if (title) query.title = title;

        const books = await database.bookDetails.findMany({
            where: query
          });
        
        if (books.length === 0) {
        return NextResponse.json({success: false, message: "No books available"}, {status: 404});
        }
        
        return NextResponse.json({success: true, data: books}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
    
   
}