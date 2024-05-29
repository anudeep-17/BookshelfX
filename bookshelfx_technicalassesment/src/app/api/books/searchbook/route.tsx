import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { database } from "../../prismaConfig";

export async function GET(req: NextApiRequest)
{
    const url = new URL(req.url || '');
    const title = url.searchParams.get('title') ? url.searchParams.get('title') : '';
    const author = url.searchParams.get('author') ? url.searchParams.get('author') : '';
    const category = url.searchParams.get('category') ? url.searchParams.get('category') : '';
    const publisher = url.searchParams.get('publisher') ? url.searchParams.get('publisher') : '';

    try {
        const books = await database.bookDetails.findMany({
            where: {
              title: { contains: title as string || '' },
              category: { contains: category as string || '' },
              publisher: { contains: publisher as string || '' },
            },
          });
        const filteredBooks = books.filter(book => 
        book.authors.some(a => a.includes(author as string || ''))
        );

        return NextResponse.json({ success: true, data: filteredBooks }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ success: false, message: err }, { status: 500 });
    }
}