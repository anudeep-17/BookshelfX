import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest)
{   
    const url = new URL(req.url || '');
    const bookname  = url.searchParams.get('bookname');
    
    if(!bookname){
        return NextResponse.json({success: false, message: "Bookname is required"}, {status: 400});
    }
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookname}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
    const data = await response.json();
    
    return NextResponse.json({success: true, data: data}, {status: 200});
}