import React from 'react';
import { Box, Button, CssBaseline, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import theme from '../Themes';
import BooksData from  "../Mock-BookData.json";
import BookCard from './BookCard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import BookCategory from "../Mock-BookCategory.json";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
 

export default function UserDashboardComponent() {
    const [categories, setCategories] = React.useState(BookCategory.bookCategories.slice(0, 7));

    const sortCategories = () => {
        const sortedCategories = [...categories].sort();
        setCategories(sortedCategories);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={
                    {
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        width: '71%'
                    }
                }
            >
                <Grid container spacing={2} >
                    <Grid item xs={6} md={15}>
                    <Paper elevation={6} square={false} sx={{ backgroundColor: '#ffffff' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    pl:1
                                }}
                            >
                               <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between', // Change this line
                                    alignItems: 'center', // Change this line
                                    alignContent: 'center',
                                    pl:1,
                                    pr:2,
                                    flexWrap: 'wrap',
                                    mt:2,
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
                                    pl:1,
                                    pr:2,
                                    mb:2,
                                    gap: 1.35,  
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
                        <Paper elevation={8} square={false} sx={{ backgroundColor: '#ffffff' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    pl:2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between', // Change this line
                                        alignItems: 'center', // Change this line
                                        alignContent: 'center',
                                        pl:1,
                                        pr:2,
                                        flexWrap: 'wrap',
                                        mt:2,
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
                                        onClick={sortCategories}
                                    >
                                        <Tooltip title="Sort by Alphabetical Order" placement="top">
                                            <SortByAlphaIcon/>
                                        </Tooltip>
                                    </Button>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        pl:1,
                                        pr:2,
                                        mb:2,
                                        pt:1,
                                        gap: 0.99,  
                                        overflowX: 'auto', // This makes only the categories scrollable
                                        maxHeight: '200px', // You might not need this anymore
                                    }}
                                >
                                    {
                                        categories.slice(0, 7).map((category, index) => (
                                            <Stack direction="row" spacing={0} key={index}>
                                                <Chip
                                                    label={category}
                                                    color="primary"
                                                    variant="outlined"
                                                    sx={{
                                                        transition: '0.5s', // Add transition for smooth elevation
                                                        ':hover': {
                                                            boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
                                                            transform: 'translateY(-5px)', // Moves the Chip up on hover
                                                        },
                                                    }}
                                                />
                                            </Stack>
                                        ))
                                    }
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    
                </Grid>
            </Box>
        </ThemeProvider>
        )
}