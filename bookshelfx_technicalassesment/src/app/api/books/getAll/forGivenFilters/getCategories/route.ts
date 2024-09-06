import { NextResponse } from "next/server";
import { database } from "../../../../prismaConfig";
import { esES } from "@mui/x-date-pickers/locales";

export async function POST(req:Request) 
{
    try
    {
        const {
            pageName, 
            isFeaturedBook
        } = await req.json();

        if(pageName === 'featuredbooks' && isFeaturedBook ===null || pageName === null)
        {
            return NextResponse.json({success: false}, {status: 404});
        }

        if(pageName === 'featuredbooks' && isFeaturedBook === true)
        {
            const categories = await database.bookDetails.findMany({
                where: {
                    isFeaturedBook: true
                },
                select: {
                    category: true
                }
            });
            let categoryList = categories.map(categoryObj => categoryObj.category);
            categoryList = Array.from(new Set(categoryList));
            return NextResponse.json({success: true, data: categoryList}, {status: 200});
        }
        else
        {
            const categories = await database.bookDetails.findMany({
                select: {
                    category: true
                }
            });
            let categoryList = categories.map(categoryObj => categoryObj.category);
            categoryList = Array.from(new Set(categoryList));
            return NextResponse.json({success: true, data: categoryList}, {status: 200});
        }
    }
    catch(e)
    {
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}