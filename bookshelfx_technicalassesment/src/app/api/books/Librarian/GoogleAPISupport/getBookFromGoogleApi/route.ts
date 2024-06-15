import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest)
{   
    try{
        const url = new URL(req.url || '');
        const author = url.searchParams.get('author');
        const title = url.searchParams.get('title');
        const publisher = url.searchParams.get('publisher');
        let startIndex = Number(url.searchParams.get('startIndex')) || 0;
        const maxResults = Number(url.searchParams.get('maxResults')) || 10;
        
        if(!author && !title && !publisher){
            return NextResponse.json({success: false, message: "At least one search parameter is required"}, {status: 400});
        }
        let query = '';
        if (author) query += `+inauthor:${author}`;
        if (title) query += `+intitle:${title}`;
        if (publisher) query += `+inpublisher:${publisher}`;
        
        startIndex = startIndex * maxResults;

        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
        const data = await response.json();
        return NextResponse.json({success: true, data: data}, {status: 200});
    }
    catch(err){
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}