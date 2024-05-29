import React from 'react';
import { Box, Button, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import theme from '../../../Themes';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import BookCategory from "../../../Mock-BookCategory.json";
import {Book, BookCardProps} from '@/Components/interfaceModels';
import dynamic from 'next/dynamic';
import { ChevronLeft } from '@mui/icons-material';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getBook, getCategories, getFavBooksByUser} from '@/Services/BookRoutines';
import { useRouter} from 'next/navigation';
import DrawerForFilter from './DrawerForFilter';

const AllBookListComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/PageWiseComponents/AllBookListComponent'), { ssr: false });
const MyFavouritesComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/PageWiseComponents/MyFavouritesComponent'), { ssr: false });
const AllCategoryComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/PageWiseComponents/AllCategoryComponent'), { ssr: false });
const FeaturedBooksComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/PageWiseComponents/FeaturedBookComponent'), { ssr: false });
const SearchResultComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/PageWiseComponents/SearchresultComponent'), { ssr: false });
 
const DetailedBookCard = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/DetailedBookCard'), { ssr: false });
export default function BookList() 
{
    const pathname = usePathname();
    const routes = ['/Reader/allbooks', '/Reader/favourites', '/Reader/allcategory', '/Reader/featuredbooks', '/Reader/searchresult'];
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
            :null
        }
        </>
    )
}