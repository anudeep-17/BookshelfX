import React from 'react';
import { Box, Button, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
import theme from '@/Components/Themes';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {Book, BookCardProps} from '@/Components/interfaceModels';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams} from 'next/navigation';
import { getBook, getCategories, getFavBooksByUser} from '@/Services/BookRoutines';
import { useRouter} from 'next/navigation';


const DetailedBookCard = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/DetailedBookCard'), { ssr: false });

export default function Searchresultcomponent()
{
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams()

    let SearchMap = new Map();
    searchParams.forEach((value, key) => {
        SearchMap.set(key, value);
        console.log(key, value);
    });

    
    return(
        <>
            SearchResult
        </>
    )
}