import { NextResponse } from "next/server";
import { database } from "../../../../prismaConfig";

export async function GET(req: Request) 
{
    try{
        const url = new URL(req.url || '');
        const title = url.searchParams.get('title');
        const author = url.searchParams.get('author');
        
        if(title == null && author == null) 
        {
            return NextResponse.json({success: false, message: "Atleast one field is required"}, {status: 400});
        }
        const isBookAlreadyInShelf = await database.bookDetails.findFirst({
            where: {
                title: title? title : undefined,
                authors: {
                    equals: author ? author.split(",") : undefined
                }
            }
        });
        
        if(isBookAlreadyInShelf)
        {
            return NextResponse.json({success: true, message: "Book already in shelf"}, {status: 200});
        }
        return NextResponse.json({success: false, message: "Book not found in shelf"}, {status: 404});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}