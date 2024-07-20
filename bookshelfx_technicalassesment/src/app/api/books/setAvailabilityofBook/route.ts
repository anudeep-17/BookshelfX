import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
 
export async function POST(req: Request)
{   
    try {
        const { bookId, availability, userId } = await req.json();
      
        // Fetch the current book details
        const currentBook = await database.bookDetails.findUnique({
          where: { id: bookId },
          include: { rentals: true },
        });

        if(!currentBook)
        {
            return NextResponse.json({success: false, message: "Book not found"}, {status: 404});
        }

        // Check if the book is already unavailable and we are trying to set it to unavailable again
        if (!currentBook.availability && !availability) 
        {
          return NextResponse.json({ success: false, message: "Book is already unavailable" }, { status: 400 });
        }
      
        // Check if the user already has an open rental on this book
        if (!availability) {
          const openRental = currentBook.rentals.find(rental => !rental.returned);
          if (openRental) {
            return NextResponse.json({ success: false, message: "A user already has an open rental on this book" }, { status: 400 });
          }
        }
        // Update the book availability
        const result = await database.bookDetails.update({
          where: { id: bookId },
          data: { availability: availability },
        });
      
        if (!availability) {
            let rentalDate = new Date();
            let returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + 5);
            const addtoRentals = await database.bookRentalDetails.create({
                data: {
                    bookId,
                    userId,
                    rentalDate,
                    returnDate,
                    returned: false,
                    isOverdue: false, // The book is being rented, so it's not overdue
                },
            });
            if(!addtoRentals)
            {
                return NextResponse.json({ success: false, message: "Rental not added" }, { status: 400 });
            }

            return NextResponse.json({ success: true, message: "Availability updated and rental added" }, { status: 200 });
            
        } else {
            const currentDate = new Date();
            const rentalDetails = await database.bookRentalDetails.findFirst({
                where: {
                    bookId: Number(bookId),
                    userId: Number(userId),
                    returned: false,
                },
            });
            const overdue = rentalDetails ? rentalDetails.returnDate < currentDate : false;
            const removefromRentals = await database.bookRentalDetails.updateMany({
                where: {
                    bookId: Number(bookId),
                    userId: Number(userId),
                },
                data: {
                    returned: true,
                    isOverdue: overdue, // If the return date is greater than 5 days, set overdue to true, else false
                },
            });

            if(!removefromRentals)
            {
                return NextResponse.json({ success: false, message: "No rental found for this user" }, { status: 400 });
            }
            return NextResponse.json({ success: true, message: "Availability updated and rental returned" }, { status: 200 });
        }
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}