import React from 'react';
import { Alert, Box, Button, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, Pagination, Skeleton, Snackbar, SnackbarCloseReason, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import theme from '@/Components/Themes';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {BookDetails} from '@/Components/interfaceModels';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { getBooksForFilters, getFeaturedBooks, getFeaturedBooksCount} from '@/Services/BookRoutines';
import { useRouter} from 'next/navigation';
import DrawerForFilter from '../DrawerForFilter';
import { handleSort, slidervaluetext_forDays } from '@/Services/SortingAndFilteringRoutines';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

const DetailedBookCard = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/DetailedBookCard'), { ssr: false, 
loading: ()=> <Skeleton variant="rectangular" width={'30%'} height={600} animation="wave" /> });

export default function FeaturedBookComponent()
{
    const router = useRouter();
    const [filterdraweropen, setFilterDrawerOpen] = React.useState(false);
    
    const [selectedChipforAvailabilityInFilter, setSelectedChipforAvailabilityInFilter] =  React.useState<string>('');
    const [selectedAuthorsInFilter, setSelectedAuthorsInFilter] = React.useState<string[]>([]);
    const [selectedCategoriesInFilter, setSelectedCategoriesInFilter] = React.useState<string[]>([]);
    const [countofBooksForFilter, setCountofBooksForFilter] = React.useState<number>(0);
    const [offsetForFilter, setOffsetForFilter] = React.useState(1);

    const [books, setBook] = React.useState<BookDetails[]>([])
    const [filteredBooks, setFilteredBooks] = React.useState<BookDetails[]>([]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [offset, setOffset] = React.useState(1);
    const [countofBooks, setCountofBooks] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState(true);

    const [alert, setAlert] = React.useState<{severity: 'success' | 'error', message: string}>({severity: 'success', message: ""});
    const [Alertopen, setAlertOpen] = React.useState(false);  
    
    const handleAlertClose = (event: React.SyntheticEvent<any, Event> | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    React.useEffect(() => {
        const fetchData = async() =>{
            const data = await getFeaturedBooksCount();
            if(data.success)
            {
                setCountofBooks(data.data);
            }
        }
        fetchData();
    },[]);

    React.useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const data = await getFeaturedBooks(offset,9);
            if (data.success) {
                setBook(data.data);
            }
        };   
        fetchData();
        setIsLoading(false);
    }, [offset]);

    React.useEffect(() => {
        setOffsetForFilter(1);
    },[selectedAuthorsInFilter, selectedCategoriesInFilter, selectedChipforAvailabilityInFilter]);
    
    React.useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const data = await getBooksForFilters(  offsetForFilter, 9, 
                                                    selectedChipforAvailabilityInFilter === 'Available'? true : false, 
                                                    selectedAuthorsInFilter, 
                                                    selectedCategoriesInFilter, 
                                                    true, 
                                                    '', 
                                                    0,
                                                    'featuredbooks'
                                                    );
            if(data.success)
            {
                setFilteredBooks(data.data);
                setCountofBooksForFilter(data.totalBooks);
            }
        }
        fetchData();
        setIsLoading(false);
    }, [selectedChipforAvailabilityInFilter, selectedAuthorsInFilter, selectedCategoriesInFilter, countofBooksForFilter, offsetForFilter]);


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
                                                        <MenuItem onClick={() => handleSort({sortBy: 'title', setBook, books, handleSortClose: handleSortClose})}>
                                                            Sort by book titles
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleSort({sortBy: 'author', setBook, books, handleSortClose: handleSortClose})}>
                                                            Sort by book authors
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
                                                                selectedChip={selectedChipforAvailabilityInFilter}
                                                                setSelectedChip={setSelectedChipforAvailabilityInFilter}

                                                                selectedAuthorInFilter={selectedAuthorsInFilter}
                                                                setSelectedAuthorsInFilter={setSelectedAuthorsInFilter}

                                                                selectedCategoriesInFilter={selectedCategoriesInFilter}
                                                                setSelectedCategoriesInFilter={setSelectedCategoriesInFilter}
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
                                        selectedChipforAvailabilityInFilter !== ''?
                                        <Typography variant='h6' gutterBottom>
                                            Availability : <span style={{color: theme.palette.text.secondary}}>{selectedChipforAvailabilityInFilter}</span>
                                        </Typography>
                                       :
                                       null
                                    }
                                    {
                                        selectedAuthorsInFilter.length>0?
                                        <Typography variant='h6' gutterBottom>
                                            Selected Authors : <span style={{color: theme.palette.text.secondary}}>{selectedAuthorsInFilter.join(", ")}</span>
                                        </Typography>
                                        :
                                        null
                                    }
                                    {
                                        selectedCategoriesInFilter.length>0?
                                        <Typography variant='h6' gutterBottom>
                                            Selected Authors :  <span style={{color: theme.palette.text.secondary}}>{selectedCategoriesInFilter.join(", ")}</span>
                                        </Typography>
                                        :
                                        null
                                    }
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
                                           isLoading ? (
                                            <>
                                            </>
                                            ) : (selectedChipforAvailabilityInFilter.length>0 || selectedAuthorsInFilter.length > 0 || selectedCategoriesInFilter.length > 0 ? filteredBooks : books).length > 0 ? (
                                                (selectedChipforAvailabilityInFilter.length>0  || selectedAuthorsInFilter.length > 0 || selectedCategoriesInFilter.length > 0 ? filteredBooks : books).map((book: BookDetails) => (
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
                                            ) : (
                                                <Typography variant="h5" color="text.secondary" sx={{mt: 3}}>
                                                    No Books Found
                                                </Typography>
                                            )
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
                                        {!isLoading && (
                                                <Pagination 
                                                    count={Math.ceil((selectedChipforAvailabilityInFilter.length>0  || selectedAuthorsInFilter.length > 0 || selectedCategoriesInFilter.length > 0 ? countofBooksForFilter : countofBooks) / 9)} 
                                                    color="primary" 
                                                    size="large"
                                                    onChange={(event, page) => {
                                                        (selectedChipforAvailabilityInFilter.length>0  || selectedAuthorsInFilter.length > 0 || selectedCategoriesInFilter.length > 0 ? setOffsetForFilter(page) : setOffset(page))
                                                    }}
                                                />
                                        )}
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