import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
import { NextApiRequest } from "next";

export async function DELETE(req: NextApiRequest) 
{
    const url = new URL(req.url || '');
    const ID = url.searchParams.get('id');

    try {
        const user = await database.user.findUnique({
            where: { id: Number(ID) },
            include: { rentals: true } // Include rentals in the query
        });
    
        if (user) {
            // Check if any rentals are open
            const openRentals = user.rentals.some(rental => rental.returned === false);
    
            if (!openRentals) {
                // If all rentals are closed, delete the user and all related data
    
                // Delete reviews
                await database.bookReview.deleteMany({
                    where: { userId: Number(ID) }
                });
    
                // Delete favorite books
                await database.favoriteBook.deleteMany({
                    where: { userId: Number(ID) }
                });
    
                // Delete rentals
                await database.bookRentalDetails.deleteMany({
                    where: { userId: Number(ID) }
                });
    
                // Delete the user
                await database.user.delete({
                    where: { id: Number(ID) }
                });
    
                return NextResponse.json({ success: true, message: "User and all related data deleted successfully" }, { status: 200 });

            } 
            else
            {
                return NextResponse.json({ success: false, message: "User has open rentals" }, { status: 400 });
            }

        } 
        else 
        {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        
    } catch (error) {
        return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
    }
}