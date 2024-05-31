'use client'
import React, { useEffect } from 'react';
import { Box, Button, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import theme from '@/Components/Themes';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Book, BookCardProps, BookRentalDetails} from '@/Components/interfaceModels';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {  getRentalsofUser} from '@/Services/BookRoutines';
import { useRouter} from 'next/navigation';
import DrawerForFilter from '../DrawerForFilter';
import { handleSort, slidervaluetext_forDays } from '@/Services/SortingAndFilteringRoutines';
import Cookies from 'js-cookie';
 
const DetailedBookCard = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/DetailedBookCard'), { ssr: false });

export default function UserRentalBookComponent()
{
    const router = useRouter();
    const [filterdraweropen, setFilterDrawerOpen] = React.useState(false);
    const [selectedChipforAvailabilityInFilter, setSelectedChipforAvailabilityInFilter] =  React.useState<string | null>('');
    const [RentalBooks, setRentalBooks] = React.useState<Book[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    let userID: string | undefined;
    const userCookie = Cookies.get('user');
    const [currentRentals, setCurrentRentals] = React.useState<Book[]>([]);
    const [previousRentals, setPreviousRentals] = React.useState<Book[]>([]);
    
    if (userCookie) {
      const user = JSON.parse(userCookie);
      userID = user?.id;
    }
 

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRentalsofUser(Number(userID));
            console.log(data.data.rentals);
            if(data.success)
            {
                const books = data.data.rentals.map((rental: BookRentalDetails) => rental.book);
                setRentalBooks(books);
                setCurrentRentals(books.filter((book: Book) => !book.availability));
                setPreviousRentals(books.filter((book: Book) => book.availability));
            }
           
        }
        if(userID)
        {
             fetchData();
        }
    },[])


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
                                                Your Rental{" "} 
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
                                                        <MenuItem onClick={() => handleSort({sortBy: 'title', setBook: setRentalBooks, books: RentalBooks, handleSortClose: handleSortClose})}>
                                                            Sort by book titles
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleSort({sortBy: 'author',  setBook: setRentalBooks, books:  RentalBooks, handleSortClose: handleSortClose})}>
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

                                <Grid item xs={12} md={12}>
                                    <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        ml: 1,
                                        mr: 1,
                                        gap: 2.5,
                                        mb: 2,
                                    }}
                                    >
                                        <Typography variant="h6" sx={{
                                        mt: 2,
                                        mb: 2,
                                        fontWeight: 'bold',
                                        textAlign: 'start',
                                        color: 'text.secondary',
                                        }}>
                                            Current Rentals:
                                        </Typography>
                                   
                                        {currentRentals && currentRentals.length > 0 ? (
                                        currentRentals.map((book: Book, index: number) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                gap: 2.5,
                                                }}
                                            >
                                                <DetailedBookCard
                                                    id={book.id}
                                                    coverimage={book.coverimage}
                                                    title={book.title}
                                                    description={book.description}
                                                    authors={book.authors}
                                                    rating={book.rating}
                                                    availability={book.availability}
                                                    onClick={() => handleBookClick(Number(book.id))}
                                                />
                                            </Box>
                                        ))
                                        ) : (
                                            <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%', // ensure the Box takes up full width
                                            }}
                                            >
                                                <Typography variant="h6">
                                                    No current rentals
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Divider flexItem sx={{
                                        width: '100%',
                                    }}/>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            ml: 1,
                                            mr: 1,
                                            gap: 2.5,
                                            mb: 2,
                                        }}
                                    >
                                     {previousRentals && previousRentals.length > 0 && (
                                        <>
                                            <Typography variant="h6" sx={{
                                            mt: 2,
                                            mb: 2,
                                            fontWeight: 'bold',
                                            textAlign: 'start',
                                            color: 'text.secondary',
                                            }}>
                                            Previous Rentals:
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                    gap: 2.5,
                                                }}
                                            >
                                            {previousRentals.map((book: Book, index: number) => (
                                                <DetailedBookCard
                                                key={index}
                                                id={book.id}
                                                coverimage={book.coverimage}
                                                title={book.title}
                                                description={book.description}
                                                authors={book.authors}
                                                rating={book.rating}
                                                availability={book.availability}
                                                onClick={() => handleBookClick(Number(book.id))}
                                                />
                                            ))}
                                            </Box>
                                        </>
                                        )}
                                    </Box>

                                    {(currentRentals && currentRentals.length === 0 && previousRentals.length === 0) && (
                                    <Typography variant="h6">No rental record</Typography>
                                    )}
                                </Grid>

                        </Grid>
                </Box>
            </Box>
        </motion.div>
        </ThemeProvider>
    )

}