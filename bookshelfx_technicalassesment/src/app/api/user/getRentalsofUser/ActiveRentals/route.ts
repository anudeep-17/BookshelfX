import { database } from "@/app/api/prismaConfig";
import { NextResponse } from "next/server";


export async function GET(req:Request)
{
    try{
        const url = new URL(req.url || '');
        const userId = url.searchParams.get('userId');
        
        if(!userId)
        {
            return NextResponse.json({success: false, message: "User ID is required"}, {status: 400});
        }

        const userWithRentalsAndBooks = await database.user.findUnique({
            where: { id: Number(userId) },
            include: { 
                rentals: {
                    where: { returned: false },
                    orderBy: {
                        createdAt: 'desc'  
                    },
                    include: { book: true }
                }
            },
        });
  
          return NextResponse.json({success: true, data: userWithRentalsAndBooks}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}