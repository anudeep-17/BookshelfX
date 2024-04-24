import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

//created !:))
export async function GET(request: Request)
{
    try{
        const result = await sql`CREATE TABLE bookdetails (
            ISBN VARCHAR(13) PRIMARY KEY,
            bookimage VARCHAR(255),
            title TEXT,
            description TEXT,
            rating FLOAT,
            publisher TEXT,
            publishedDate DATE,
            category TEXT,
            pageCount INT,
            customerReviews TEXT[]
        );`;
        return NextResponse.json({ result }, { status: 200 });
    }
    catch(err)
    {   
        return NextResponse.json({ err}, { status: 500 });
    }
}
