'use client'
import React, { useEffect } from 'react';
import { Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
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
import DateRangeIcon from '@mui/icons-material/DateRange';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const DetailedBookCard = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/DetailedBookCard'), { ssr: false });

export default function UserRentalBookComponent()
{
    const router = useRouter();
    const [filterdraweropen, setFilterDrawerOpen] = React.useState(false);
    const [selectedChipforAvailabilityInFilter, setSelectedChipforAvailabilityInFilter] =  React.useState<string | null>('');
    const [RentalBooks, setRentalBooks] = React.useState<Book[]>([]);
    const [RentalBookWholeDetails, setRentalBookWholeDetails] = React.useState<BookRentalDetails[]>([]);
    const [openRentals, setOpenRentals] = React.useState<BookRentalDetails[]>([]);
    const [closedRentals, setClosedRentals] = React.useState<BookRentalDetails[]>([]);
    const [selectedRentalDates, setSelectedRentalDates] = React.useState<string>();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    let userID: string | undefined;
    const userCookie = Cookies.get('user');

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
                setRentalBookWholeDetails(data.data.rentals);
                setOpenRentals(data.data.rentals.filter((rental: BookRentalDetails) => rental.returned === false));
                setClosedRentals(data.data.rentals.filter((rental: BookRentalDetails) => rental.returned === true));
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

    const [drawerOpen, setDrawerOpen] = React.useState(true);

    // Add a new function to toggle the drawer
    const toggleDrawerForRentals = (open:boolean) => () => {
        setDrawerOpen(open);
    };

    const handleDateClick = (date: string) => {
        setSelectedRentalDates(date);
        const filteredBooks = RentalBookWholeDetails
        .filter((bookDetail: BookRentalDetails) => new Date(bookDetail.rentalDate).toLocaleDateString() === date)
        .flatMap((bookDetail: BookRentalDetails) => bookDetail.book);
        setRentalBooks(filteredBooks);
    }

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
                                                        <MenuItem onClick={() => handleSort({sortBy: 'author',  setBook: setRentalBooks, books: RentalBooks, handleSortClose: handleSortClose})}>
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

                                <Grid item xs={12} md={2}>
                                <Box
                                    role="presentation"
                                    sx={{
                                        alignItems: 'center', 
                                        justifyContent: 'center',  
                                        height: '100%',
                                    }}
                                >
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        mt: 2,
                                        mb: 2,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        flexWrap: 'wrap',
                                    }}>
                                        All Rental Dates
                                    </Typography>
                                    <Box 
                                        sx={{
                                            mb: 2,
                                            ml: 2
                                        }}
                                    >
                                        <Accordion defaultExpanded sx={{
                                        }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography>Open Rentals</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            {
                                                openRentals.length > 0 ? (
                                                    Array.from(new Set(openRentals.map(rental => new Date(rental.rentalDate).toLocaleDateString())))
                                                    .map((date, index, self) => (
                                                        <>
                                                            <ListItem disablePadding>
                                                                <ListItemButton
                                                                    selected={selectedRentalDates === date}
                                                                    sx={{ 
                                                                        borderRadius: '4px', // Make edges curved
                                                                        m:2,
                                                                        display: 'flex', // Add this
                                                                        justifyContent: 'center', // Add this
                                                                        '&:hover': {
                                                                            backgroundColor: 'transparent',
                                                                            '& .MuiSvgIcon-root': {
                                                                                color: '#3f51b5',
                                                                            },
                                                                            '& .MuiListItemText-root': {
                                                                                fontWeight: 'bold',
                                                                            },
                                                                        },
                                                                        '&.Mui-selected': {
                                                                            '& .MuiListItemText-root': {
                                                                                fontWeight: 'bold',
                                                                            },
                                                                        },
                                                                    }}
                                                                    onClick = {() => handleDateClick(date)}
                                                                >
                                                                    <ListItemIcon>
                                                                        <DateRangeIcon/>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={date} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                            {index !== self.length - 1 && <Divider sx={{ml:2, mr:2}}/>}
                                                        </>
                                                    ))
                                                ) : (
                                                    <Typography
                                                        variant='body1'
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            alignContent: 'center',
                                                            flexWrap: 'wrap',
                                                            color: 'text.secondary'
                                                        }}
                                                    >
                                                        No current Rentals
                                                    </Typography>
                                                )
                                            }
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion >
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography>Closed Rentals</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            {
                                                closedRentals.length > 0 ? (
                                                    Array.from(new Set(closedRentals.map(rental => new Date(rental.rentalDate).toLocaleDateString())))
                                                    .map((date, index, self) => (
                                                        <>
                                                            <ListItem disablePadding>
                                                                <ListItemButton
                                                                 selected={selectedRentalDates === date}
                                                                    sx={{ 
                                                                        borderRadius: '4px', // Make edges curved
                                                                        display: 'flex', // Add this
                                                                        justifyContent: 'center', // Add this
                                                                        '&:hover': {
                                                                            backgroundColor: 'transparent',
                                                                            '& .MuiSvgIcon-root': {
                                                                                color: '#3f51b5',
                                                                            },
                                                                            '& .MuiListItemText-root': {
                                                                                fontWeight: 'bold',
                                                                            },
                                                                        },
                                                                        '&.Mui-selected': {
                                                                            '& .MuiListItemText-root': {
                                                                                fontWeight: 'bold',
                                                                            },
                                                                        },
                                                                    }}
                                                                    onClick = {() => handleDateClick(date)}
                                                                >
                                                                    <ListItemIcon>
                                                                        <DateRangeIcon/>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={date}/>
                                                                </ListItemButton>
                                                            </ListItem>
                                                            {index !== self.length - 1 && <Divider sx={{ml:2, mr:2}}/>}
                                                        </>
                                                    ))
                                                ) : (
                                                    <Typography>No Rentals</Typography>
                                                )
                                            }
                                            </AccordionDetails>
                                        </Accordion>
                                    </Box>
                                </Box>
                            </Grid>
                           
                            <Grid item xs={12} md={10}>
                                <Box
                                    sx={{
                                        alignItems: 'center', 
                                        justifyContent: 'center'  
                                    }}
                                >
                                    <Typography variant = 'h6' sx={{
                                         fontWeight: 'bold',
                                         mt: 2,
                                         mb: 2,
                                         display: 'flex',
                                         justifyContent: 'center',
                                         alignItems: 'center',
                                         alignContent: 'center',
                                         flexWrap: 'wrap',
                                    }}>
                                        All Rental Books
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    flexWrap: 'wrap',
                                    mt: 2,
                                    mb: 2,
                                    gap: 2
                                }}>
                                    {
                                        RentalBooks.length > 0 ? (
                                            RentalBooks.map((book: Book) => (
                                                <DetailedBookCard
                                                    key={book.id}
                                                    coverimage={book.coverimage}
                                                    title={book.title}
                                                    description={book.description}
                                                    rating={book.rating}
                                                    authors={book.authors}
                                                    availability={book.availability}
                                                    onClick= {() => handleBookClick(book.id as number)}
                                                />
                                            ))
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignContent: 'center',
                                                    flexWrap: 'wrap',
                                                    color: 'text.secondary'
                                                }}
                                            >

                                                <Typography
                                                    variant='h5'
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        alignContent: 'center',
                                                        flexWrap: 'wrap',
                                                        color: 'text.secondary'
                                                    }}
                                                >
                                                    No current Rentals
                                                </Typography>
                                            </Box>
                                        ) 
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