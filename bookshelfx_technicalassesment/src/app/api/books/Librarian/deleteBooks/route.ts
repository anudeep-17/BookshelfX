import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";
import { de } from "@faker-js/faker";

export async function DELETE(req: Request) 
{
    try{
        const url = new URL(req.url);
        const title = url.searchParams.get('title');
        const authors = url.searchParams.get('authors');
         
        if(title == null || authors == null) 
        {
            return NextResponse.json({success: false, message: "All fields are required"}, {status: 400});
        }

        
        const deleteBooks = await database.bookDetails.deleteMany({
            where: {
                title: title,
                authors: {
                    hasSome: authors ? authors.split(",") : undefined
                }
            }
        });

        if(!deleteBooks)
        {
            return NextResponse.json({success: false, message: "No books found to delete"}, {status: 404});
        }

        return NextResponse.json({success: true, message:"All books deleted successfully"}, {status: 200});
    }
    catch(err)
    {
        console.error(err);
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}