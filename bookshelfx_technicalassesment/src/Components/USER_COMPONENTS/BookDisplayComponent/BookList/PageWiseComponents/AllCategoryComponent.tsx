import React from 'react';
import { Alert, Box, Button, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, Pagination, Snackbar, SnackbarCloseReason, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import theme from '@/Components/Themes';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {BookDetails, BookCardProps} from '@/Components/interfaceModels';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {getCategories, getBooksByCategory, getBooksCountByCategory, getBooksForFilters} from '@/Services/BookRoutines';
import { useRouter} from 'next/navigation';
import DrawerForFilter from '../DrawerForFilter';
import { handleSort } from '@/Services/SortingAndFilteringRoutines';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
 
const DetailedBookCard = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/DetailedBookCard'), { ssr: false });

export default function AllCategoryBookListComponent()
{
    const router = useRouter();
    const [filterdraweropen, setFilterDrawerOpen] = React.useState(false);
    
    const [isloading, setIsLoading] = React.useState<boolean>(false);
    const [selectedChipforAvailabilityInFilter, setSelectedChipforAvailabilityInFilter] =  React.useState<string>('');
    const [selectedAuthorsInFilter, setSelectedAuthorsInFilter] = React.useState<string[]>([]);
    const [countofBooksForFilter, setCountofBooksForFilter] = React.useState<number>(0);
    const [offsetForFilter, setOffsetForFilter] = React.useState(1);


    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const [allCategory, setCategory] = React.useState<string[]>([]);

    const [categoryWiseBooks, setCategoryWiseBooks] = React.useState<BookDetails[]>([]);
    const [filteredBooks, setFilteredBooks] = React.useState<BookDetails[]>([]);
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const[bookCount, setBookCount] = React.useState<number>(0);
    const [offset, setOffset] = React.useState<number>(0);
    
    const [alert, setAlert] = React.useState<{severity: 'success' | 'error', message: string}>({severity: 'success', message: ""});
    const [Alertopen, setAlertOpen] = React.useState(false);  


    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getBooksCountByCategory(selectedCategory? selectedCategory : '');
            if (data.success) {
                setBookCount(data.data);
            }
        };
        fetchData();
    },[selectedCategory])

    React.useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const data = await getBooksByCategory(selectedCategory? selectedCategory : '', offset, 9);
            if (data.success) {
                setCategoryWiseBooks(data.data);
            }
        }
        fetchData();
        setIsLoading(false);
    },[selectedCategory, offset])

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getCategories();
            if (data.success) {
                setCategory(data.data);
            }
        };

        fetchData();
    }, []);

    React.useEffect(() => {
        setOffsetForFilter(1);
    },[selectedAuthorsInFilter, selectedChipforAvailabilityInFilter]);
    
    React.useEffect(() => {
        setSelectedAuthorsInFilter([]);
        setSelectedChipforAvailabilityInFilter('');
    }
    ,[selectedCategory])

    React.useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const data = await getBooksForFilters( offsetForFilter, 9, 
                                                    selectedChipforAvailabilityInFilter !='' ? selectedChipforAvailabilityInFilter === 'Available'? true : false : null,  
                                                    selectedAuthorsInFilter, 
                                                    [], 
                                                    null, 
                                                    selectedCategory, 
                                                    null,
                                                    'allcategory'
                                                    );
            if(data.success)
            {
                setFilteredBooks(data.data);
                setCountofBooksForFilter(data.totalBooks);
            }
        }
        fetchData();
        setIsLoading(false);
    }, [selectedChipforAvailabilityInFilter, selectedAuthorsInFilter, countofBooksForFilter, offsetForFilter]);



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

    const onCategorySelection = (category: string) => {
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
                                                Category Wise{" "} 
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
                                                        <Tooltip title="Sort by Alphabetical Order" placement="top" arrow>
                                                            <SortByAlphaIcon/>
                                                        </Tooltip>
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
                                                        <MenuItem disabled={selectedCategory === null} onClick={() => handleSort({sortBy: 'title', setBook: setCategoryWiseBooks, books: categoryWiseBooks, handleSortClose: handleSortClose})}>
                                                            Sort by book titles
                                                        </MenuItem>
                                                        <MenuItem disabled={selectedCategory === null} onClick={() => handleSort({sortBy: 'author',  setBook: setCategoryWiseBooks, books: categoryWiseBooks, handleSortClose: handleSortClose})}>
                                                            Sort by book authors
                                                        </MenuItem>
                                                        <MenuItem disabled={selectedCategory === null} onClick={() => handleSort({sortBy: 'Category', setCategory, allCategory, handleSortClose: handleSortClose})}>
                                                            Sort book categories
                                                        </MenuItem>
                                                    </Menu>
                                                    </>
                                                

                                               
                                                    <>
                                                        <Button
                                                            sx={{
                                                            boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
                                                            ':hover': {
                                                                boxShadow: '0 6px 10px 4px rgba(63, 81, 181, .5)',
                                                            },
                                                            }}
                                                            onClick={toggleDrawer(true)}
                                                            disabled = {selectedCategory === null}
                                                        >
                                                            <Tooltip title="Filter" placement="top" arrow>
                                                             <FilterAltIcon sx={{ color: 'primary.main' }} />
                                                            </Tooltip>
                                                        </Button>
                                                        <Drawer anchor='right' open={filterdraweropen} onClose={toggleDrawer(false)}>
                                                             <DrawerForFilter 
                                                                toggleDrawer={toggleDrawer}
                                                               
                                                                selectedChip={selectedChipforAvailabilityInFilter}
                                                                setSelectedChip={setSelectedChipforAvailabilityInFilter}

                                                                selectedAuthorInFilter={selectedAuthorsInFilter}
                                                                setSelectedAuthorsInFilter={setSelectedAuthorsInFilter}

                                                                SpecificCategory={selectedCategory}
                                                            />
                                                        </Drawer>
                                                    </>
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
                                                    onClick={() =>  onCategorySelection(category)}
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
                                            isloading 
                                            ? <></>
                                            : (selectedCategory !== null 
                                                ? ((selectedAuthorsInFilter.length>0 || selectedChipforAvailabilityInFilter.length>0 ? filteredBooks:categoryWiseBooks).length > 0 
                                                    ? (selectedAuthorsInFilter.length>0 || selectedChipforAvailabilityInFilter.length>0 ? filteredBooks:categoryWiseBooks).map((book: BookDetails) => (
                                                        <DetailedBookCard
                                                            key={book.id}
                                                            bookID={Number(book.id)}
                                                            coverimage={book.coverimage}
                                                            title={book.title}
                                                            description={book.description}
                                                            rating={book.rating}
                                                            authors={book.authors}
                                                            availability= {book.availability}
                                                            onClick= {() => handleBookClick(book.id as number)}
                                                            setAlert={setAlert}
                                                            setAlertOpen={setAlertOpen}
                                                        />
                                                    ))
                                                    : <Typography variant="h5" color="text.secondary" sx={{mt: 3}}>
                                                        No Books Found
                                                    </Typography>)
                                                : <Typography variant="h5" color="text.secondary" sx={{mt: 3}}>
                                                    Please select a category
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
                                               count={Math.ceil((selectedCategory !== null ? (selectedAuthorsInFilter.length>0 || selectedChipforAvailabilityInFilter.length>0 ? countofBooksForFilter: bookCount) : 0) / 9)}
                                               color="primary" 
                                               size="large"
                                               page={selectedCategory !== null ? offset : 1}
                                               onChange={(event, page) => {
                                                   selectedCategory !== null ? (selectedAuthorsInFilter.length>0 || selectedChipforAvailabilityInFilter.length>0 ? setOffsetForFilter(page) : setOffset(page)) : setOffset(1);
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