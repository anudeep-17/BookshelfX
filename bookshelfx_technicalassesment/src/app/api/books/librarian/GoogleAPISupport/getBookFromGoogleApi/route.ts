import { NextResponse } from "next/server";

export async function GET(req: Request )
{   
    try{
        const url = new URL(req.url || '');
       
        const author = url.searchParams.get('authors');
        const title = url.searchParams.get('title');
        const publisher = url.searchParams.get('publisher');
        const category = url.searchParams.get('category');
        let startIndex = Number(url.searchParams.get('startIndex')) || 0;
        const maxResults = Number(url.searchParams.get('maxResults')) || 10;
        
        if(!author && !title && !publisher && !category)
        {
            return NextResponse.json({success: false, message: "At least one search parameter is required"}, {status: 400});
        } 

        let query = '';
        if (title) query += encodeURIComponent(`+intitle:${title}`);
        if (author) query += encodeURIComponent(`+inauthor:${author}`);
        if (publisher) query += encodeURIComponent(`+inpublisher:${publisher}`);
        if (category) query += encodeURIComponent(`+subject:${category}`);
        
        startIndex = startIndex * maxResults;

        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
        const data = await response.json();
        return NextResponse.json({success: true, data: data}, {status: 200});
    }
    catch(err){
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}