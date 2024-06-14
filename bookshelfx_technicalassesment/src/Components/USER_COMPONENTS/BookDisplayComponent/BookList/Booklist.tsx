import React from 'react';
import dynamic from 'next/dynamic';
import { usePathname} from 'next/navigation';

const AllBookListComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/PageWiseComponents/AllBookListComponent'), { ssr: false });
const MyFavouritesComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/PageWiseComponents/MyFavouritesComponent'), { ssr: false });
const AllCategoryComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/PageWiseComponents/AllCategoryComponent'), { ssr: false });
const FeaturedBooksComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/PageWiseComponents/FeaturedBookComponent'), { ssr: false });
const SearchResultComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/PageWiseComponents/SearchresultComponent'), { ssr: false });
const UserRentalBookComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/PageWiseComponents/UserRentalBookComponent'), { ssr: false });
export default function BookList() 
{
    const pathname = usePathname();
    const routes = ['/Reader/allbooks', '/Reader/favourites', '/Reader/allcategory', '/Reader/featuredbooks', '/Reader/searchresult','/Reader/myrentals'];
    return(
        <>
        {
            pathname=== routes[0]?
                <AllBookListComponent/>
            :pathname=== routes[1]?
                <MyFavouritesComponent/>
            :pathname=== routes[2]?
                <AllCategoryComponent/>
            :pathname=== routes[3]?
                <FeaturedBooksComponent/>
            :pathname=== routes[4]?
                <SearchResultComponent/>
            :pathname=== routes[5]?
                <UserRentalBookComponent/>
            :null
        }
        </>
    )
}