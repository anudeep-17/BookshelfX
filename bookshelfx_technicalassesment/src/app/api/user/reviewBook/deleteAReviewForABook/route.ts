import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";
 

export async function DELETE(req: Request) 
{
    try
    {
        const {bookId, userID} = await req.json();
        if(!bookId || !userID)
        {
            return NextResponse.json({success:false, message: "Please provide both bookId and userID"}, {status: 400});
        }

        const existingReview = await database.bookReview.findFirst({
            where: {bookId: bookId, userId: userID}
        });
        
        if(existingReview)
        {
            // Delete the existing review
            await database.bookReview.delete({
                where: {userId_bookId: {userId: userID, bookId: bookId}}
            });

            return NextResponse.json({success:true, message: "Review deleted successfully"},{status: 200});
        }
        else
        {
            return NextResponse.json({success:false, message: "Review not found"}, {status: 404});
        }
    }
    catch
    {
        return NextResponse.json({success:false , message: "An error occured"}, {status: 500});
    }
}