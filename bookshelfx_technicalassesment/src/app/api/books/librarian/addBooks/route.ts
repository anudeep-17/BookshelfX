import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";
 
export async function POST(req: Request) 
{

    try{
        const { 
            title, 
            authors, 
            description, 
            ISBN, 
            coverimage, 
            availability, 
            category, 
            publisher, 
            publishedDate, 
            pagecount, 
            rating, 
            isFeaturedBook } = await req.json();
    
            if(title == null || authors == null || description == null || ISBN == null || coverimage == null || availability == null || category == null || publisher == null || publishedDate == null || pagecount == null || rating == null || isFeaturedBook == null) 
            {
                console.log({
                    title,
                    authors,
                    description,
                    ISBN,
                    coverimage,
                    availability,
                    category,
                    publisher,
                    publishedDate,
                    pagecount,
                    rating,
                    isFeaturedBook
                });
                return NextResponse.json({success: false, message: "All fields are required"}, {status: 400});
            }
    
        
        const newBook = await database.bookDetails.create({
            data: {
                ISBN,
                coverimage,
                title,
                authors,
                description,
                availability,
                category,
                publisher,
                publishedDate,
                pagecount,
                rating,
                isFeaturedBook
            },
        });

        return NextResponse.json({success: true, message:"Book created successfully", book:newBook}, {status: 200});
    }
    catch(err)
    {
        console.error(err);
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}