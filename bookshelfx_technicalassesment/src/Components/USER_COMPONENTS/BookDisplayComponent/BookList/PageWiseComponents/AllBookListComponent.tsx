import React from 'react';
import { Alert, Box, Button, CssBaseline, Drawer, Menu, MenuItem, Pagination, Snackbar, SnackbarCloseReason, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import theme from '@/Components/Themes';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {BookDetails, BookCardProps} from '@/Components/interfaceModels';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { getAllBooksCount, getBooks, getBooksByCategory, getBooksCountByCategory, getCategories} from '@/Services/BookRoutines';
import { useRouter} from 'next/navigation';
import DrawerForFilter from '../DrawerForFilter';
import { handleSort, slidervaluetext_forDays } from '@/Services/SortingAndFilteringRoutines';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
 
const DetailedBookCard = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/DetailedBookCard'), { ssr: false });

export default function AllBooksListComponent()
{
    const router = useRouter();
    const [filterdraweropen, setFilterDrawerOpen] = React.useState(false);
    const [selectedChipforAvailabilityInFilter, setSelectedChipforAvailabilityInFilter] =  React.useState<string | null>('');

    const [selectedCategory, setSelectedCategory] = React.useState<string>('All Books');
    const [allCategory, setCategory] = React.useState<string[]>([]);
    
    const [books, setBook] = React.useState<BookDetails[]>([])
    const [categoryWiseBooks, setCategoryWiseBooks] = React.useState<BookDetails[]>([]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const [offset, setOffset] = React.useState(1);
    const [offsetForCategory, setOffsetForCategory] = React.useState(1);

    const [countofBooks, setCountofBooks] = React.useState<number>(0);
    const [countofBooksByCategory, setCountofBooksByCategory] = React.useState<number>(0);
    
    const [alert, setAlert] = React.useState<{severity: 'success' | 'error', message: string}>({severity: 'success', message: ""});
    const [Alertopen, setAlertOpen] = React.useState(false);  
    
    React.useEffect(() => {
        const fetchData = async() =>{
            const data = await getAllBooksCount();
            if(data.success)
            {
                setCountofBooks(data.data);
            }
        }
        fetchData();
    },[]);

    React.useEffect(() => {
        const fetchData = async() =>{
            const data = await getBooksCountByCategory(selectedCategory);
            if(data.success)
            {
                setCountofBooksByCategory(data.data);
            }
        }
        fetchData();
    }, [selectedCategory]);

    React.useEffect(() => {
        const fetchData = async () => {
            if(selectedCategory !== 'All Books')
            {
                const data = await getBooksByCategory(selectedCategory, offsetForCategory, 9);
                if (data.success) {
                    setCategoryWiseBooks(data.data);
                }
            }
        };

        fetchData();
    }, [selectedCategory, offsetForCategory]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getBooks(offset, 9);
            if (data.success) {
                setBook(data.data);
            }
        };
        fetchData();
    }, [offset]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getCategories();
            if (data.success) {
                setCategory(['All Books', ...data.data]);
            }
        };
        fetchData();
    }, []);

    function handleBookClick(id: number) {
        router.push(`/Reader/book/${id}`);
    }

    const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleSortClose = () => {
    setAnchorEl(null);
    };
  
    const toggleDrawer = (newOpen: boolean) => () => 
    {
        setFilterDrawerOpen(newOpen);
    };

    const handleCategoryClick = (category: string) => {
        setOffsetForCategory(1);
        setSelectedCategory(category);
    }

    const handleAlertClose = (event: React.SyntheticEvent<any, Event> | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <motion.div
            initial={{ opacity: 0 }} // Set the initial state to 0
            animate={{ opacity: 1 }} // Animate to 1
            exit={{ opacity: 0 }} // Set the exit to 0
            transition={{  ease: "easeInOut",
                        duration: 1,
                        x: { duration: 1 } }}
        >
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, mb: 1, display: 'inline' }}>
                                                All{" "} 
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
                                            
                                               
                                            <Typography variant="body1" sx={{ mt: 2, mb: 1, display: 'inline', mr:2 }}>
                                                &quot;Checkout our books Where Every Book is a{" "}
                                                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2, mb: 1, color: 'text.secondary', display: 'inline' }}>
                                                    New Horizon
                                                </Typography>
                                                &quot;
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
                                                        <MenuItem onClick={() => handleSort({sortBy: 'title', setBook: selectedCategory !== null && selectedCategory !== 'All Books' ? setCategoryWiseBooks : setBook, books: selectedCategory !== null && selectedCategory !== 'All Books' ? categoryWiseBooks : books, handleSortClose: handleSortClose})}>
                                                            Sort by book titles
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleSort({sortBy: 'author', setBook: selectedCategory !== null && selectedCategory !== 'All Books' ? setCategoryWiseBooks : setBook, books: selectedCategory !== null && selectedCategory !== 'All Books' ? categoryWiseBooks : books, handleSortClose: handleSortClose})}>
                                                            Sort by book authors
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleSort({sortBy: 'Category', setCategory, allCategory, handleSortClose: handleSortClose})}>
                                                            Sort book categories
                                                        </MenuItem>
                                                    </Menu>
                                                    </>
                                                </Tooltip>
                                                
                                                <Tooltip title="Filter" placement="top" arrow>
                                                    <>
                                                        <Button
                                                            sx={{
                                                            boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
                                                            ':hover': {
                                                                boxShadow: '0 6px 10px 4px rgba(63, 81, 181, .5)',
                                                            },
                                                            }}
                                                            onClick={toggleDrawer(true)}
                                                        >
                                                            <FilterAltIcon sx={{ color: 'primary.main' }} />
                                                        </Button>
                                                        <Drawer anchor='right' open={filterdraweropen} onClose={toggleDrawer(false)}>
                                                             <DrawerForFilter 
                                                                toggleDrawer={toggleDrawer}
                                                                slidervaluetext_forDays={slidervaluetext_forDays}
                                                                selectedChip={selectedChipforAvailabilityInFilter}
                                                                setSelectedChip={setSelectedChipforAvailabilityInFilter} 
                                                            />
                                                        </Drawer>
                                                    </>
                                                </Tooltip>
                                            </Box>
                                        </Box>                        
                                </Grid>
                                <Grid item xs={15} md={15}>                                        
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            alignContent: 'flex-start',
                                            
                                        }}
                                    >
                                        <Stack direction="row" spacing={1} sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            ml:2,
                                            mr:3,
                                            gap:1,
                                        }}>
                                        {
                                            allCategory.map((category: string, index) => (
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
                                                    onClick={() =>  handleCategoryClick(category)}
                                                    clickable
                                                />
                                            ))
                                        }
                                        </Stack>
                                    </Box>
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
                                            gap:2.5, 
                                            mb:2,
                                        }}
                                    >
                                        {
                                            selectedCategory === null || selectedCategory === 'All Books'
                                            ? (books.length > 0 
                                                ? books.map((book: BookDetails) => (
                                                    <DetailedBookCard
                                                        key={book.id}
                                                        bookID={Number(book.id)}
                                                        coverimage={book.coverimage}
                                                        title={book.title}
                                                        description={book.description}
                                                        rating={book.rating}
                                                        authors={book.authors}
                                                        availability={book.availability}
                                                        onClick= {() => handleBookClick(book.id as number)}
                                                        setAlert={setAlert}
                                                        setAlertOpen={setAlertOpen}
                                                    />
                                                ))
                                                : <Typography variant="h5" color="text.secondary" sx={{mt: 3}}>
                                                    No Books Found
                                                </Typography>)
                                            : (categoryWiseBooks.length > 0 
                                                ? categoryWiseBooks.map((book: BookDetails) => (
                                                    <DetailedBookCard
                                                    key={book.id}
                                                    bookID={Number(book.id)}
                                                    coverimage={book.coverimage}
                                                    title={book.title}
                                                    description={book.description}
                                                    rating={book.rating}
                                                    authors={book.authors}
                                                    availability={book.availability}
                                                    onClick= {() => handleBookClick(book.id as number)}
                                                    setAlert={setAlert}
                                                    setAlertOpen={setAlertOpen}
                                                    />
                                                ))
                                                : <Typography variant="h5" color="text.secondary" sx={{mt: 3}}>
                                                    No Books Found
                                                </Typography>)
                                        }
                                    </Box>
                                </Grid>
                                <Grid xs={12} sm={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignContent: 'center',
                                            mb: 2,
                                            mt:2,
                                        }}
                                    >
                                        { 
                                                <Pagination 
                                                    count={Math.ceil((selectedCategory !== 'All Books' ? countofBooksByCategory : countofBooks) / 9)}
                                                    color="primary" 
                                                    size="large"
                                                    page={selectedCategory !== 'All Books' ? offsetForCategory : offset}
                                                    onChange={(event, page) => {
                                                        selectedCategory !== 'All Books' ? setOffsetForCategory(page) : setOffset(page);
                                                    }}
                                                />
                                         } 
                                    </Box>
                                </Grid>
                        </Grid>
                </Box>
                <Snackbar open={Alertopen} autoHideDuration={3000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity={alert?.severity} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
                {
                    alert.severity === 'success' && alert.message === 'Book checked out successfully' ? 
                    <Fireworks autorun={{ speed: 1, duration: 1000}}/> : null
                }

            </Box>
        </motion.div>
        </ThemeProvider>
    )

}