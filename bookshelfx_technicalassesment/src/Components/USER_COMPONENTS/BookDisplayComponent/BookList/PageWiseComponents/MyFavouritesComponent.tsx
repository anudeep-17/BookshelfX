'use client'
import React from 'react';
import { Box, Button, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import theme from '@/Components/Themes';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Book, BookCardProps} from '@/Components/interfaceModels';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { getBook, getCategories, getFavBooksByUser} from '@/Services/BookRoutines';
import { useRouter} from 'next/navigation';
import DrawerForFilter from '../DrawerForFilter';
import { handleSort, slidervaluetext_forDays } from '@/Services/SortingAndFilteringRoutines';
import Cookies from 'js-cookie';
 
const DetailedBookCard = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/DetailedBookCard'), { ssr: false });

export default function MyFavouritesComponent()
{
    const router = useRouter();
    const [filterdraweropen, setFilterDrawerOpen] = React.useState(false);
    const [selectedChipforAvailabilityInFilter, setSelectedChipforAvailabilityInFilter] =  React.useState<string | null>('');
    const [favBooks, setFavBooks] = React.useState<Book[]>([])
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    let userID: string | undefined;
    const userCookie = Cookies.get('user');
    
    if (userCookie) {
      const user = JSON.parse(userCookie);
      userID = user?.id;
    }

    React.useEffect(() => {
        const fetchData = async () => {
            if( userID !== undefined)
            {
                const data = await getFavBooksByUser(Number(userID));
                if (data.success) {
                    setFavBooks(data.data);
                }
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
                                                        <MenuItem onClick={() => handleSort({sortBy: 'title', setBook: setFavBooks, books: favBooks, handleSortClose: handleSortClose})}>
                                                            Sort by book titles
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleSort({sortBy: 'author',  setBook: setFavBooks, books: favBooks, handleSortClose: handleSortClose})}>
                                                            Sort by book titles
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
                                          favBooks.length > 0 ? favBooks.map((book: any, index) => {
                                            if (book?.book) {
                                                return (
                                                    <DetailedBookCard
                                                        key={index}
                                                        coverimage={book.book.coverimage}
                                                        title={book.book.title}
                                                        description={book.book.description}
                                                        rating={book.book.rating}
                                                        authors={book.book.authors}
                                                        availability={Boolean(true)}
                                                        onClick={() => handleBookClick(book.book.id as number)}
                                                    />
                                                );
                                            }
                                        })
                                        :
                                        <Typography variant="h6" sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            No Favourite Books Found
                                        </Typography>
                                        }
                                    </Box>
                                </Grid>

                        </Grid>
                </Box>
            </Box>
        </motion.div>
        </ThemeProvider>
    )

}