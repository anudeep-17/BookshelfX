import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";
 

export async function POST(req: Request) 
{
    try
    {
        const {bookId, userID, rating, review} = await req.json();
        if(!bookId || !userID || !rating || !review)
        {
            return NextResponse.json({success:false, message: "Please fill in all fields"}, {status: 400});
        }

        const existingReview = await database.bookReview.findFirst({
            where: {bookId: bookId, userId: userID}
        });
        
        if(existingReview)
        {
            // Update the existing review
            await database.bookReview.update({
                where: {userId_bookId: {userId: userID, bookId: bookId}},
                data: {
                    rating: rating,
                    review: review
                }
            });
        }
        else
        {
            // Create a new review
            await database.bookReview.create({
                data: {
                    bookId: bookId,
                    userId: userID,
                    rating: rating,
                    review: review
                }
            });
        }

        return NextResponse.json({success:true, message: "Review left successfully"},{status: 200});
    }
    catch
    {
        return NextResponse.json({success:false , message: "An error occured"}, {status: 500});
    }
}