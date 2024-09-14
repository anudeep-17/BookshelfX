import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";

export async function GET(req:  Request)
{
    const url = new URL(req.url || '');
    const title = url.searchParams.get('title') ? url.searchParams.get('title') : '';
    const author = url.searchParams.get('author') ? url.searchParams.get('author') : '';
    const category = url.searchParams.get('category') ? url.searchParams.get('category') : '';
    const publisher = url.searchParams.get('publisher') ? url.searchParams.get('publisher') : '';

    try {
        const books = await database.bookDetails.findMany({
          where: {
            AND: [
              {
                title: {
                  contains: title as string || '',
                  mode: 'insensitive'
                },
              },
              {
                category: {
                  contains: category as string || '',
                  mode: 'insensitive'
                },
              },
              {
                publisher: {
                  contains: publisher as string || '',
                  mode: 'insensitive'
                },
              },
            ]
          },
        });
        
        const filteredBooks = books.filter(book => 
          book.authors.some(a => a.toLowerCase().includes((author as string || '').toLowerCase()))
        );

        return NextResponse.json({ success: true, data: filteredBooks }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ success: false, message: err }, { status: 500 });
    }
}