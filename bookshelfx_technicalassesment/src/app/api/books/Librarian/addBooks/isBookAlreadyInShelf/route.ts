import { NextResponse } from "next/server";
import { database } from "../../../../prismaConfig";

export async function GET(req: any) 
{
    try{
        const url = new URL(req.url);
        const title = url.searchParams.get('title');
        const author = url.searchParams.get('author');
        console.log(title, author);
        if(title == null && author == null) 
        {
            return NextResponse.json({success: false, message: "Atleast one field is required"}, {status: 400});
        }
        const isBookAlreadyInShelf = await database.bookDetails.findFirst({
            where: {
                title: title? title : undefined,
                authors: {
                    hasSome: author ? author.split(",") : undefined
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
        console.error(err);
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}