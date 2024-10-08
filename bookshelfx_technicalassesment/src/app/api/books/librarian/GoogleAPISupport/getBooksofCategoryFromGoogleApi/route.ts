import { NextResponse } from "next/server";

export async function GET(req: Request)
{   
    const url = new URL(req.url || '');
    const category  = url.searchParams.get('category');
    
    if(!category){
        return NextResponse.json({success: false, message: "Category is required"}, {status: 400});
    }
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=4&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
    const data = await response.json();
    
    return NextResponse.json({success: true, data: data}, {status: 200});
}