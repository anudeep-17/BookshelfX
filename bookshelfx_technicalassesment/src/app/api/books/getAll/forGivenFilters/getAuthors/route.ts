import { NextResponse } from "next/server";
import { database } from "../../../../prismaConfig";

export async function POST(req:Request) 
{
    try
    {
        const {
            pageName, 
            isFeaturedBook,
            SpecificCategory,
            FavouriteBooksForUserID,
        } = await req.json();

        if( pageName === 'featuredbooks' && isFeaturedBook === null || pageName === 'allcategory' && SpecificCategory == null || 
            pageName === 'favourites' && FavouriteBooksForUserID == null)
        {
            return NextResponse.json({success: false, message: "All fields are required"}, {status: 400});
        }

        let filters: any = {
            AND: []
        };

        if(pageName === 'featuredbooks')
        {
            filters.isFeaturedBook = true;
        }

        if(pageName === 'allcategory' || SpecificCategory !== null)
        {
            filters.category = SpecificCategory;
        }

        if(pageName === 'favourites')
        {
            filters.AND.push({ UserID: FavouriteBooksForUserID });
        }

        if (filters.AND.length === 0) {
            delete filters.AND;
        }

        let AuthorsList = [];

        console.log(filters);

        if(pageName === 'favourites') {
            AuthorsList = await database.favoriteBook.findMany({
                select: {
                    book: {
                        select: {
                            authors: true
                        }
                    }
                },
                where: filters,
            });
        
            // Extract unique authors
            const uniqueAuthors = Array.from(new Set(AuthorsList.flatMap(item => item.book.authors)));
        
            // Assign uniqueAuthors back to AuthorsList
            AuthorsList = uniqueAuthors;
        }
        else
        {
            AuthorsList = await database.bookDetails.findMany({
                select: {
                    authors: true
                },
                where: filters,
                distinct: ['authors']
            })
        }

        return NextResponse.json({success: true, data: AuthorsList}, {status: 200});
    }
    catch(e)
    {
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}