import { NextResponse } from "next/server";
import { database } from "../../prismaConfig";

export async function GET(req: Request)
{
    try {
        const url = new URL(req.url);
        const userId = parseInt(url.searchParams.get('userId') || '');
<<<<<<< HEAD
      
        if (!userId) 
            return NextResponse.json({success: false, message: "userId is required"}, {status: 400});
    
        const favBook = await database.user.findUnique({
            where: {
                id: userId
            },
            include: {
                favoriteBooks: {
                include: {
                    book: true
                }
                }
            }
            })

        if (favBook) 
            return NextResponse.json({success: true, data: favBook.favoriteBooks}, {status: 200});
        else 
            return NextResponse.json({success: false, message: "Record does not exist"}, {status: 404});
=======
        const bookId = parseInt(url.searchParams.get('bookId') || '');
      
        if (!userId || !bookId) 
          return NextResponse.json({success: false, message: "userId and bookId are required"}, {status: 400});
      
        const favBook = await database.favoriteBook.findUnique({
          where: {
            userId_bookId: {
              userId,
              bookId
            }
          }
        });
      
        if (favBook) 
          return NextResponse.json({success: true, message: "Record exists"}, {status: 200});
        else 
          return NextResponse.json({success: false, message: "Record does not exist"}, {status: 404});
>>>>>>> refs/remotes/origin/progressBranch
      
      }
      catch(err) {
        return NextResponse.json({success: false, message: err}, {status: 500});
      }
}