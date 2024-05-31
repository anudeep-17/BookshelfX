import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";

export async function GET(req:Request)
{
    try{
        const url = new URL(req.url || '');
        const userId = url.searchParams.get('userId');
        
        if(!userId)
        {
            return NextResponse.json({success: false, message: "User ID is required"}, {status: 400});
        }

        const userRentals = await database.user.findUnique({
            where: {
                id: Number(userId)
            },
            include: { rentals: true },
          });

          return NextResponse.json({success: true, data: userRentals}, {status: 200});
    }
    catch(err)
    {
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}