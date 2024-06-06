import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
 

export async function GET(req: Request)
{
    try{
        const url = new URL(req.url || '');
        const category = url.searchParams.get('category');
        const authors = url.searchParams.get('authors');
        const title = url.searchParams.get('title');

        const query: { category?: string, authors?: { has: string } | undefined, title?: string } = {};
        if (category) query.category = category;
        if (title) query.title = title;
        if (authors) {
            const authorsArray = authors.split(',').map(author => author.trim());
            query.authors = {
                has: authorsArray[0] // This will search for books where the authors array contains the first author in the list
            };
        }
        
        const books = await database.bookDetails.findMany({
            where: query,
            include:{
                rentals: true,
                reviews: true,
            }
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