import { NextResponse } from "next/server";
 
export async function GET(req: Request)
{   
    const url = new URL(req.url || '');
    const author = url.searchParams.get('author');
    
    if(!author){
        return NextResponse.json({success: false, message: "author is required"}, {status: 400});
    }
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
    const data = await response.json();
    
    return NextResponse.json({success: true, data: data}, {status: 200});
}