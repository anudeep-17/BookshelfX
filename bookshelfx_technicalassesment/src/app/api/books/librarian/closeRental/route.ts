import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";

export async function POST(req: Request) 
{
    try{
        const {bookID , userID, rentalID} = await req.json();
        if(!bookID || !userID || !rentalID)
        {
            return NextResponse.json({success: false, message: "Invalid request"}, {status: 400});
        }

        const rentalDetails = await database.bookRentalDetails.findUnique({
            where: {
                id: rentalID
            }
        });

        if (!rentalDetails)
        {
            return NextResponse.json({success: false, message: "Rental not found"}, {status: 404});
        }

        if(rentalDetails.returned)
        {
            return NextResponse.json({success: false, message: "Book already returned"}, {status: 400});
        }

        if(rentalDetails.userInitiatedReturn && Number(rentalDetails.userId) === Number(userID) && Number(rentalDetails.bookId) === Number(bookID))
        {
            const updatedRentalDetails = await database.bookRentalDetails.update({
                where: {
                    id: rentalID
                },
                data: {
                    returned: true
                }
            });

            const updatedBookDetails = await database.bookDetails.update({
                where: {
                    id: bookID
                },
                data: {
                    availability: true
                }
            });

            if(updatedRentalDetails && updatedBookDetails)
            {
                return NextResponse.json({success: true, message: "Book returned successfully"}, {status: 200});
            }
            else
            {
                return NextResponse.json({success: false, message: "Failed to return book"}, {status: 500});
            }
        }
        else
        {
            return NextResponse.json({success: false, message: "User has not initiated return"}, {status: 400});
        }
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}