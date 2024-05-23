import React from 'react';
import { Box, Button, CssBaseline, Grid, Paper, Rating, Skeleton, ThemeProvider, Toolbar, Typography } from '@mui/material';
import theme from '../../Themes';
import { Book } from '../../interfaceModels';
import { getBookByID } from '@/Services/BookRoutines';
import { DashboardSize } from "@/Components/DashboardSize";
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

const drawerWidth = DashboardSize;
const OPTIONS: EmblaOptionsType = { loop: true }

export default function WholeBookData({id}:{id: string})
{
    const [book, setBook] = React.useState<Book>();

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getBookByID(id);
            if (data.success) {
                setBook(data.data);
            }
        };
    
        const timeoutId = setTimeout(fetchData, 500); // Delay of 500 milliseconds
    
        return () => clearTimeout(timeoutId); // Clean up on component unmount
    }, [id]);

    return(
        <ThemeProvider theme={theme}>
        <Box sx={{ 
                  display: 'flex',
                }}>
            <CssBaseline />
              <Box
                component="main"
                sx={{width: { sm: `calc(100% - ${drawerWidth}px)`}, marginLeft: { sm: `${drawerWidth}px` }, }}
              >
                <Toolbar />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        p:1.5
                    }}
                >
                    <Paper elevation={3} sx={{p:2, mb:2}}>
                        {book? <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Box 
                                    component="img" 
                                    src={book?.coverimage} 
                                    alt={book?.title} 
                                    sx={{ 
                                        width: 350,
                                        height: 450,
                                        objectFit: 'cover',
                                        mb:2
                                        }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <Typography variant="h5" sx={{mb:1}}>
                                    {book?.title}
                                </Typography>
                                <Typography variant="h6" sx={{mb:1, color: theme.palette.text.secondary}} >
                                    {book?.authors.join(', ')}
                                </Typography>
                                <Typography variant="body1" sx={{mb:1}}>
                                    <Rating value={book?.rating} readOnly/>
                                </Typography>
                                <Typography variant="body1" sx={{mb:1, color: theme.palette.text.secondary}}>
                                <span>
                                    <Typography component="span" sx={{color: theme.palette.text.primary}} noWrap>
                                    Genere: {" "}
                                    </Typography> 
                                    {book?.category}
                                </span>
                                </Typography>
                                <Typography variant="body1" sx={{mb:1, color: theme.palette.text.secondary}}>
                                <span>
                                    <Typography component="span" sx={{color: theme.palette.text.primary}} noWrap>
                                    Page count: {" "}
                                    </Typography>
                                    {book?.pagecount === 0 ? 'Not Available' : book?.pagecount}
                                </span>
                                </Typography>

                                <Typography variant="body1" sx={{mb:1, color: theme.palette.text.secondary}}>
                                <span>
                                    <Typography component="span" sx={{color: theme.palette.text.primary}} noWrap>
                                    Publisher: {" "}
                                    </Typography>
                                    {book?.publisher}
                                </span>
                                </Typography>

                                <Typography variant="body1" sx={{mb:1, color: theme.palette.text.secondary}}>
                                <span>
                                    <Typography component="span" sx={{color: theme.palette.text.primary}} noWrap>
                                    Published Date: {" "}
                                    </Typography>
                                    {book?.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : 'Not Available'}
                                </span>
                                </Typography>

                                <Typography variant="body2" sx={{mb:1}}>
                                    Book Description: {book?.description}
                                </Typography>

                                <Typography variant="body1" sx={{mb:1, color: theme.palette.text.secondary}}>
                                <span>
                                    <Typography component="span" sx={{color: theme.palette.text.primary}} noWrap>
                                    Availability: {" "}
                                    </Typography>
                                    {book?.availability ? 'Yes 🎉' : 'No 😔'}
                                </span>
                                </Typography>
                                <Button variant="outlined" color="primary"  sx={{mb:2, mt:1}}>
                                    Checkout Book
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h5" sx={{mb:1, color: theme.palette.text.secondary}}>
                                    Reader Reviews: 
                                </Typography>
                                <EmblaCarousel slides={book?.customerReviews || []} options={OPTIONS} />
                            </Grid>
                        </Grid>:
                         <Grid container>
                         <Grid item xs={12} sm={4}>
                           <Skeleton variant="rectangular" width={350} height={450} sx={{mb:2}}/>
                         </Grid>
                         <Grid item xs={12} sm={8}>
                           <Skeleton variant="text" sx={{mb:1}}/>
                           <Skeleton variant="text" sx={{mb:1}}/>
                           <Skeleton variant="text" sx={{mb:1}}/>
                           <Skeleton variant="text" sx={{mb:1}}/>
                           <Skeleton variant="text" sx={{mb:1}}/>
                           <Skeleton variant="text" sx={{mb:1}}/>
                           <Skeleton variant="text" sx={{mb:1}}/>
                           <Skeleton variant="text" sx={{mb:1}}/>
                           <Skeleton variant="rectangular" width={100} height={40} sx={{mb:2}}/>
                         </Grid>
                         <Grid item xs={12} sm={12}>
                           <Skeleton variant="text" sx={{mb:1}}/>
                           <Skeleton variant="rectangular" width="74rem" height="13.5rem" />
                         </Grid>
                       </Grid>
                        }
                    </Paper>
                     
                </Box>
              </Box>
        </Box>
        </ThemeProvider>
    )
}