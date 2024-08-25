import { NextResponse } from "next/server";
import { database } from "../../../prismaConfig";

export async function POST(req:Request) 
{
    try
    {   
        const url = new URL(req.url || '');
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const {availabilityFilterPassed, authorsFilterPassed, categoriesFilterPassed, isFeaturedBook, SpecificCategory, UserID, currentPage} = await req.json();

        if (availabilityFilterPassed == null || authorsFilterPassed == null || (SpecificCategory === false && currentPage !== 'allcategory' && categoriesFilterPassed == null) || (currentPage === 'favourites' && UserID == null)) {
            return NextResponse.json({success: false, message: "All fields are required"}, {status: 400});
        }

        let filters: any = {
            AND: []
        };

        if(isFeaturedBook && currentPage === 'featuredbooks')
        {
            filters.isFeaturedBook = true;
        }

        if(SpecificCategory !== null && currentPage === 'category')
        {
            filters.category = SpecificCategory;
        }

        if (availabilityFilterPassed != null) {
            filters.AND.push({ availability: availabilityFilterPassed });
        }

        if (authorsFilterPassed != null && authorsFilterPassed.length > 0) {
            filters.AND.push({ authors: { hasSome: authorsFilterPassed } });
        }

        if (categoriesFilterPassed != null && categoriesFilterPassed.length > 0 && currentPage !== 'allcategory' && SpecificCategory === null) 
        {
            filters.AND.push({ category: { in: categoriesFilterPassed } });
        }

        if (filters.AND.length === 0) {
            delete filters.AND;
        }
        
        const countofFeaturedBooksForGivenFilters = await database.bookDetails.count({
            where: filters,
        })
        
        const result = await database.bookDetails.findMany({
            where: filters,
            include: {
                rentals: true,
                reviews: true,
                favoritedBy: true
            },
            skip: (page-1) * limit,
            take: limit
        });

        if (result.length === 0) 
        {
            return NextResponse.json({success: false, message: "No books available"}, {status: 404});
        }

        return NextResponse.json({success: true, data: result, totalBooks: countofFeaturedBooksForGivenFilters}, {status: 200}); 
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}