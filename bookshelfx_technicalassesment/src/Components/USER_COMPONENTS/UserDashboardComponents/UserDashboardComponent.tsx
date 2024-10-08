import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, CssBaseline, Snackbar, SnackbarContent, ThemeProvider, Tooltip, Typography, useMediaQuery } from '@mui/material';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import theme from '../../Themes';
import BookCard from './BookCard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ImageCard from './ImageCard';
import dynamic from 'next/dynamic';
import Skeleton from '@mui/material/Skeleton';
import { getBooksByCategory, getFeaturedBooks } from '@/Services/BookRoutines';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { BookDetails } from '@/Components/interfaceModels';
import bookcover from '@/assets/bookcover.png';

const QuickBookDetails = dynamic(() => import('./QuickBookDetails'), { ssr: false, loading: () => 
    <CircularProgress
        sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'primary.main'
        }}
/>});

/**
 * UserDashboardComponent is a component that displays the user dashboard.
 * It fetches book data and displays featured books and categories.
 */
export default function UserDashboardComponent() {
    const [categories, setCategory] = React.useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            const userCookie = Cookies.get('user');
            const data = userCookie ? JSON.parse(userCookie).favoriteCategories : undefined;
            if (data !== undefined) 
            {
                setCategory(data);
            }
            setSelectedCategory(data[0]);
        };
        fetchData();
    }, []);


    const router = useRouter();

    const sortCategories = () => {
        const sortedCategories = [...categories].sort();
        setCategory(sortedCategories);
    };

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));

    const [book, setBook] = React.useState({} as BookDetails);

    const [BookData, setBookData] = React.useState<BookDetails[]>([]);

    React.useEffect(() => {
        async function fetchData() {
          const data = await getFeaturedBooks(1,5);
          if (data.success) {
            setBookData(data.data);
          }
        }
        fetchData();
      }, []);  

    const [categoryWiseBookData, setCategoryWiseBookData] = React.useState<{ [key: string]: BookDetails[] }>({});

    useEffect(() => {
        async function fetchData() 
        {
            const tempData: { [key: string]: BookDetails[] } = {};
            for (const category of categories) {
                const data = await getBooksByCategory(category);
                tempData[category] = data.data;
            }
            setCategoryWiseBookData(tempData);
        }
    
        fetchData();
    }, [categories]);

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if(BookData.length > 0 && categoryWiseBookData[selectedCategory]?.length > 0)
        {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 500); 
    
            return () => clearTimeout(timer); 
        }
    }, [BookData, selectedCategory, categoryWiseBookData]);

    const handleBookClick =(id: number) => {
        router.push(`/Reader/book/${id}`);
    }

    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
                            sm:0
                        },
                    }}
                >
                    <Box
                        sx={
                            {
                                overflow: 'hidden',
                                backgroundColor: 'white',
                                width: {xs:'100%', sm:'73.5%'},
                                mt: 2,
                                mb: 2
                            }
                        }
                    >
                        <Grid container spacing={2} >
                            <Grid item xs={15} md={15}>
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

                                            onClick={() => router.push('/Reader/featuredbooks')}
                                        >
                                            View All <KeyboardArrowRightIcon sx={{ml:1}}/>
                                        </Button>
                                        </Box>

                                        <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between', 
                                            width: '100%',

                                            flexWrap: {
                                                xs: 'wrap',
                                                sm: 'nowrap',
                                            },
                                            pl:1,
                                            pr:2,
                                            mb:2,
                                            gap:{xs:0.5, sm:0}
                                        }}
                                        >
                                            {
                                                loading ?
                                                Array.from(new Array(5)).map((_, index) => (
                                                    <Skeleton variant="rectangular" width={150} height={300} key={index} animation="wave" />
                                                ))
                                                :
                                                BookData ?
                                                (
                                                    BookData.length > 0 ?
                                                    BookData.map((book, index) => (
                                                        <BookCard
                                                            key={index}
                                                            bookID={Number(book.id)}
                                                            coverimage={book?.coverimage !== 'N/A' ? book?.coverimage : bookcover.src}
                                                            title={book?.title}
                                                            description={book?.description}
                                                            rating={book?.rating}
                                                            authors={book?.authors}
                                                            availability={book?.availability}
                                                            onMouseEnter={() => {setBook(book as BookDetails)}}
                                                            onClick={() => handleBookClick(book.id as number)}
                                                        />
                                                    ))
                                                    :
                                                    <Typography variant="h6" sx={{pl:1}}>
                                                        No books available in the library.
                                                    </Typography>
                                                )
                                                :
                                                null
                                            }
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            
                            
                            {/* category where we display all categories if the library available books. */}
                            <Grid item xs={15} md={15}>
                                <Paper elevation={8} square={false} sx={{ backgroundColor: '#ffffff' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start', 
                                            pl:1,
                                            width: '100%',
                                            overflow: 'auto',
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
                                                width: '95%',
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

                                        <Stack direction="row" spacing={0.4} sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between', // Change this line
                                            alignItems: 'center', // Change this line
                                            alignContent: 'center',
                                            pt:1,
                                            flexWrap: {
                                                xs: 'wrap',
                                                sm: 'nowrap',
                                            },
                                        
                                            gap: {xs: 1, sm: 1},
                                        }}>
                                            {categories.map((category, index) => (
                                                <Chip
                                                    key={index}  
                                                    label={category}
                                                    color="primary"
                                                    variant={category === selectedCategory ? "filled" : "outlined"}
                                                    sx={{
                                                        minWidth: 'max-content',  
                                                        boxShadow: '0 3px 5px 2px transparent',  
                                                        ':hover': {
                                                            boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)', // Changes the shadow on hover
                                                        },
                                                    }}
                                                    onClick={() => setSelectedCategory(category)}
                                                    clickable
                                                />
                                            ))}
                                        </Stack>
                                    

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between', // Change this line
                                                alignItems: 'center', // Change this line
                                                alignContent: 'center',
                                                pt:1,
                                                pl:1,
                                                pr:2,
                                                flexWrap: 'wrap',
                                                width: '100%',
                                                
                                            }}
                                        >
                                            {
                                                loading ?
                                                Array.from(new Array(5)).map((_, index) => (
                                                    <Skeleton variant="rectangular" width={120} height={180} key={index} sx={{mb:2}} animation="wave" />
                                                ))
                                                :
                                                categoryWiseBookData[selectedCategory] ?
                                                    categoryWiseBookData[selectedCategory].map((book, index) => (
                                                        <ImageCard 
                                                            key={index} 
                                                            bookID={Number(book.id)}
                                                            image={book.coverimage !== 'N/A' ? book.coverimage : bookcover.src} 
                                                            rating={book.rating} 
                                                            title={book.title} 
                                                            availability={book.availability}
                                                            onMouseEnter={() => setBook(book as BookDetails)}
                                                            onClick={() => handleBookClick(book?.id as number)}
                                                        />
                                                    ))
                                                    : 
                                                    "No books available in this category."
                                            }
                                            
                                        </Box>
                                    
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box
                        sx={{
                            overflow: 'hidden',
                            width: {xs:'100%', sm:'25%'},
                            minHeight: '92.2vh',
                            top:0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '-webkit-linear-gradient(90deg, hsla(0, 0%, 100%, 1) 0%, hsla(222, 36%, 95%, 1) 100%)',
                        }}
                    >                         
                         { !isXs && book ? <QuickBookDetails book={book}/> : <QuickBookDetails/> }
                    </Box>
                </Box>
        </ThemeProvider>
        )
}