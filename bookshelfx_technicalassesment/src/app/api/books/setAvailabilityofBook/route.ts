import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
 
export async function POST(req: Request)
{   
    try{
        const {bookId, availability, userId} = await req.json();
        console.log(bookId, availability, userId);
        const result = await database.bookDetails.update(
            {
                where: {
                    id: bookId
                },
                data: {
                    availability: availability
                }
            }
        );
        if(!availability)
        {
            let rentalDate = new Date()
            let returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + 5);
            const addtoRentals = await database.bookRentalDetails.create({
                data:{
                    bookId,
                    userId,
                    rentalDate,
                    returnDate,
                    returned: false
                }
            })
            return NextResponse.json({success: true, message: "Availability updated and rental added"}, {status: 200});
        }
        else
        {
            const removefromRentals = await database.bookRentalDetails.updateMany({
                where: {
                  bookId: Number(bookId),
                  userId: Number(userId),  
                },
                data: {
                  returned: true
                }
              });
            return NextResponse.json({success: true, message: "Availability updated and rental added"}, {status: 200});
        }
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}