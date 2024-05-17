import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";


export async function POST(req: Request) 
{
    
    const { title, authors, description, ISBN, coverimage, availability, category, publisher, publishedDate, pagecount, rating, customerReviews } = await req.json();
    
    if(!title || !authors || !description || !ISBN || !coverimage || !availability || !category || !publisher || !publishedDate || !pagecount || !rating || !customerReviews)
    {
            
        return NextResponse.json({success: false, message: "All fields are required"}, {status: 400});
    }
    
    try{
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
                customerReviews
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