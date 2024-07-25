import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";
 

export async function POST(req: Request) 
{
    try
    {
        const {bookId, userID} = await req.json();
        if(!bookId || !userID )
        {
            return NextResponse.json({success:false, message: "Please fill in all fields"}, {status: 400});
        }

        const existingReview = await database.bookReview.findFirst({
            where: {bookId: bookId, userId: userID}
        });
        
        if(!existingReview)
        {
            return NextResponse.json({success:false, message: "You have not left a review for this book"}, {status: 400});
        }

        return NextResponse.json({success:true, message: "Review already given", review: existingReview},{status: 200});
      
    }
    catch
    {
        return NextResponse.json({success:false , message: "An error occured"}, {status: 500});
    }
}