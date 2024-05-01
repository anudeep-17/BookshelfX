import React from 'react';
import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import theme from '../Themes';
import BooksData from  "../Mock-BookData.json";
import BookCard from '../Dashboard/BookCard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function UserDashboardComponent() {
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Grid  container spacing={2}>
                    <Grid item xs={6} md={15}>
                        <Paper
                            elevation={24}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    pl:2
                                }}
                            >
                               <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between', // Change this line
                                    alignItems: 'center', // Change this line
                                    alignContent: 'center',
                                    pl:2,
                                    pr:2,
                                    flexWrap: 'wrap',
                                    mt:3,
                                    mb:2,
                                    width: '100%',
                                }}
                                >
                                <Typography variant="h5" sx= {{
                                    fontWeight: 'bold',
                                }}>
                                    Featured Books 
                                </Typography>

                                <Button
                                    sx={{
                                    boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
                                    ':hover': {
                                        boxShadow: '0 6px 10px 4px rgba(63, 81, 181, .5)',
                                    },
                                    }}
                                >
                                    View All <KeyboardArrowRightIcon sx={{ml:1}}/>
                                </Button>
                                </Box>

                                <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap',
                                    pl:2,
                                    pr:2,
                                    mt:2,
                                    mb:3,
                                    gap: 2,  
                                }}
                                >
                                {BooksData.slice(0, 5).map((book, index) => (
                                    <BookCard
                                    key={index}
                                    image={book.bookimage}
                                    title={book.title}
                                    description={book.description}
                                    rating={book.rating}
                                    />
                                ))}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    
                    {/* category where we display all categories if the library available books. */}
                    <Grid item xs={6} md={15}>
                        <Paper
                            elevation={24}
                        >
                               <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    pl:2
                                }}
                                >
                                    <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between', // Change this line
                                        alignItems: 'center', // Change this line
                                        alignContent: 'center',
                                        pl:2,
                                        pr:2,
                                        flexWrap: 'wrap',
                                        mt:3,
                                        mb:2,
                                        width: '100%',
                                    }}
                                    >
                                        <Typography variant="h5" sx= {{
                                            fontWeight: 'bold',
                                        }}>
                                            Categories
                                        </Typography>

                                        <Button
                                            sx={{
                                            boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
                                            ':hover': {
                                                boxShadow: '0 6px 10px 4px rgba(63, 81, 181, .5)',
                                            },
                                            }}
                                        >
                                            View All <KeyboardArrowRightIcon sx={{ml:1}}/>
                                        </Button>
                                    </Box>
                                </Box>


                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
        )
}