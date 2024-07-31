import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";
 

export async function GET(req: Request) 
{
    try{
        const url =  new URL(req.url);
        const id = url.searchParams.get("id");
        
        if(!id){
            return NextResponse.json({message: "User id is required"}, {status: 400});
        }

        const user = await database.user.findUnique({
            where: {
                id: parseInt(id)
            },
            include: 
            {
                favoriteBooks: true, 
                rentals: true, 
                reviews: true,
                authorizedRentals: true
            }
        });

        if(user){
            if(user.role === 'customer')
            {
                const userDetails  = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    favoriteCategories: user.favoriteCategories,
                    favouriteBooks: user.favoriteBooks,
                    rentals: user.rentals,
                    reviews: user.reviews,
                    Avatar: user.Avatar
                }
                return NextResponse.json({
                    success: true,
                    data: userDetails
                }, {status: 200});
            }
            else if(user.role === 'librarian')
            {
                const userDetails  = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    authorizedRentals: user.authorizedRentals,
                    Avatar: user.Avatar
                }
                return NextResponse.json({
                    success: true,
                    data: userDetails
                }, {status: 200});
            }
            else
            {
                return NextResponse.json({success: false, mmessage: "User not found"}, {status: 404});
            }
        }
    }
    catch(e){
        return NextResponse.json({success: false, message: "An error occured"}, {status: 500});
    }
}