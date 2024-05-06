import React from 'react';
import { Box, Button, CssBaseline, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import theme from '../Themes';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import BooksData from  "../Mock-BookData.json";
import BookCategory from "../Mock-BookCategory.json";
import CategoryWiseBook from '@/Components/Mock-CategoryWiseBookData.json'
import {Book, BookCardProps} from '@/Components/interfaceModels';
import dynamic from 'next/dynamic';
 
const DetailedBookCard = dynamic(() => import('@/Components/BookList/DetailedBookCard'), { ssr: false });

export default function BookList() 
{
    const [books, setBook] = React.useState((BooksData as unknown as BookCardProps[]))
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleSortClose = () => {
      setAnchorEl(null);
    };

    function handleSort(sortBy: string){
        if(sortBy === 'title')
        {
            setBook(sortBooksByTitle(books as BookCardProps[]));
        }
        else if(sortBy === 'author')
        {
            setBook(sortBooksByAuthor(books as BookCardProps[]));
        }
        handleSortClose();
    }

    function sortBooksByTitle(books: BookCardProps[]) {
        return [...books].sort((a, b) => a.title.localeCompare(b.title));
    }

    function sortBooksByAuthor(books: BookCardProps[]) {
        return [...books].sort((a, b) => a.author.localeCompare(b.author));
    }
    

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    alignContent: 'center',
                    flexWrap: 'wrap',
                    ml:2,
                    mr:{
                        xs:2,
                        sm:2
                    },
                }}
            >
                    <Box
                        sx={
                            {
                                overflow: 'hidden',
                                backgroundColor: 'white',
                                width: {xs:'100%', sm:'100%'},
                                mt: 2,
                                mb: 2
                            }
                        }
                    >
                     <Grid container spacing={2} >
                            <Grid item xs={15} md={15}>
                                {/* <Paper elevation={6} square={false} sx={{ backgroundColor: '#ffffff' }}> */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, mb: 1, display: 'inline' }}>
                                                Featured{" "}
                                                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, mb: 1, color: 'text.secondary', display: 'inline' }}>
                                                    Books
                                                </Typography>
                                        </Typography>
                                    </Box>

                                        <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',  
                                            alignContent: 'center',
                                            ml:1,
                                            mr:1,
                                        }}
                                        >
                                            <Typography variant="body1" sx={{ mt: 2, mb: 1, display: 'inline' }}>
                                                &quot;Checkout our featured books Where Every Book is a{" "}
                                                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2, mb: 1, color: 'text.secondary', display: 'inline' }}>
                                                    New Horizon
                                                </Typography>
                                                &quot;
                                            </Typography>
                                            <Typography variant="body2" sx={{ mt:1, mb:1 }}>
                                            
                                            </Typography>

                                            <Box
                                                sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',  
                                                alignItems: 'center',  
                                                mt:1,
                                                mb:1,
                                                }}
                                            >
                                                <Tooltip title="Sort by Alphabetical Order" placement="top" arrow>
                                                    <>
                                                    <Button
                                                        sx={{
                                                        mr:1,
                                                        boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
                                                        ':hover': {
                                                            boxShadow: '0 6px 10px 4px rgba(63, 81, 181, .5)',
                                                        },
                                                        }}
                                                        onClick={handleSortClick}
                                                    >
                                                        <SortByAlphaIcon/>
                                                    
                                                    </Button>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleSortClose}
                                                        MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={() => handleSort("title")}>Sort by book titles</MenuItem>
                                                        <MenuItem onClick={() => handleSort("author")}>Sort by book Author</MenuItem>
                                                    </Menu>
                                                    </>
                                                </Tooltip>
                                                
                                                <Tooltip title="Filter" placement="top" arrow>
                                                <Button
                                                    sx={{
                                                    boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
                                                    ':hover': {
                                                        boxShadow: '0 6px 10px 4px rgba(63, 81, 181, .5)',
                                                    },
                                                    }}
                                                >
                                                    <FilterAltIcon sx={{ color: 'primary.main' }} />
                                                </Button>
                                                </Tooltip>
                                            </Box>
                                        </Box>                        
                                {/* </Paper> */}
                                </Grid>
                                <Grid item xs={15} md={15}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignContent: 'center',
                                                flexWrap: 'wrap',
                                                ml:1,
                                                mr:1,
                                                gap:2, 
                                                mb:2,
                                            }}
                                        >
                                            {
                                                books.map((book: BookCardProps) => {
                                                    return (
                                                        <DetailedBookCard
                                                            bookimage={book.bookimage}
                                                            title={book.title}
                                                            description={book.description}
                                                            rating={book.rating}
                                                            author={book.author}
                                                            availability={Boolean(true)}
                                                        />
                                                    );
                                                })
                                            }
                                          </Box>
                                </Grid>
                            </Grid>
                    </Box>
                </Box>
        </ThemeProvider>
    )
}