import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";

export async function GET(req: Request)
{
    try {
        const url = new URL(req.url);
        const userId = parseInt(url.searchParams.get('userId') || '');
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '9');
      
        if (!userId) 
            return NextResponse.json({success: false, message: "userId is required"}, {status: 400});
        
        const favbookcount = await database.favoriteBook.count({
            where: {
                userId: userId
            }
        })

        const favBook = await database.user.findUnique({
            where: {
                id: userId
            },
            include: {
                favoriteBooks: {
                    include: {
                        book: true
                    },
                    skip: (page-1) * limit,
                    take: limit
                }
            }
        })

        if (favBook) 
            return NextResponse.json({success: true, data: favBook.favoriteBooks, totalbooks: favbookcount}, {status: 200});
        else 
            return NextResponse.json({success: false, message: "Record does not exist"}, {status: 404});
      
      }
      catch(err) {
        return NextResponse.json({success: false, message: err}, {status: 500});
      }
}