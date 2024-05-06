import React from 'react';
import { Box, Button, CssBaseline, Divider, IconButton, Rating, ThemeProvider, Tooltip, Typography } from '@mui/material';
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
import DetailedBookCard from './DetailedBookCard';

export default function BookList() 
{
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
                                            <Typography variant="body2" sx={{ mt:1, mb:1 }}>
                                             &quot;Checkout our featured books Where Every Book is a New Horizon&quot;
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
                                                <Tooltip title="Sort by Alphabetical Order" placement="top">
                                                <Button
                                                    sx={{
                                                    mr:1,
                                                    boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
                                                    ':hover': {
                                                        boxShadow: '0 6px 10px 4px rgba(63, 81, 181, .5)',
                                                    },
                                                    }}
                                                >
                                                    <SortByAlphaIcon/>
                                                </Button>
                                                </Tooltip>
                                                
                                                <Tooltip title="Filter" placement="top">
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
                                                BooksData.map((book: BookCardProps) => {
                                                    return (
                                                        <DetailedBookCard
                                                            bookimage={book.bookimage}
                                                            title={book.title}
                                                            description={book.description}
                                                            rating={book.rating}
                                                            author={book.author}
                                                            availability={book.availability}
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