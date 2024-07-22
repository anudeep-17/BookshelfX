import React, { use } from 'react';
import { Box, Button, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
import theme from '@/Components/Themes';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams} from 'next/navigation';
import { useRouter} from 'next/navigation';
import Grid from '@mui/material/Grid'; 
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {BookDetails} from '@/Components/interfaceModels';
import { motion } from 'framer-motion';
import { searchBook } from '@/Services/BookRoutines';
import DrawerForFilter from '../DrawerForFilter';
import { handleSort, slidervaluetext_forDays } from '@/Services/SortingAndFilteringRoutines';


const DetailedBookCard = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/DetailedBookCard'), { ssr: false });

export default function Searchresultcomponent()
{
    const router = useRouter();
    const searchParams = useSearchParams()
    const [SearchResultBooks, setSearchResultBooks] = React.useState<BookDetails[]>([]); 
    const [filterdraweropen, setFilterDrawerOpen] = React.useState(false);
    const [selectedChipforAvailabilityInFilter, setSelectedChipforAvailabilityInFilter] =  React.useState<string | null>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    
    const open = Boolean(anchorEl);

    let SearchMap = new Map();
    searchParams.forEach((value, key) => {
        SearchMap.set(key, value);
    });


    React.useEffect(() => {
        const fetchData = async () => {
            const props = {
                title: SearchMap.get('title')? SearchMap.get('title') : '',
                author: SearchMap.get('author')? SearchMap.get('author') : '',
                category: SearchMap.get('category')? SearchMap.get('category') : '',
                publisher: SearchMap.get('publisher')? SearchMap.get('publisher') : '',
            }
            const data = await searchBook(props.title, props.author, props.category, props.publisher);
            if(data.success)
            {
                setSearchResultBooks(data.data);
            }
           
        }
        fetchData();
    }, [searchParams]);

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
                                                Search Result of{" "} 
                                                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, mb: 1, color: 'text.secondary', display: 'inline' }}>
                                                    Book(s)
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
                                                        <MenuItem onClick={() => handleSort({sortBy: 'title', setBook: setSearchResultBooks, books: SearchResultBooks, handleSortClose: handleSortClose})}>
                                                            Sort by book titles
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleSort({sortBy: 'author',  setBook: setSearchResultBooks, books: SearchResultBooks, handleSortClose: handleSortClose})}>
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

                                <Grid item xs={15} md={15}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            alignContent: 'flex-start',
                                            flexWrap: 'wrap',
                                            ml:1,
                                            mr:1,
                                            mb:2,
                                        
                                        }}
                                    >
                                        <Typography variant="h5" sx={{mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.palette.text.secondary}}>
                                            Search result for:  
                                        </Typography>
                                        <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        {
                                            Array.from(SearchMap).map(([key, value], index) => (
                                                <Typography 
                                                key={index}
                                                variant="h6" 
                                                sx={{ 
                                                  mt: 2, 
                                                  mb: 2,
                                                  mr:1, 
                                                  display: 'flex', 
                                                  alignItems: 'center', 
                                                  justifyContent: 'center',
                                                  '& span': {
                                                    textTransform: 'capitalize',
                                                    color: theme.palette.primary.main,
                                                  }
                                                }}
                                              >
                                                <span>{key}</span>: {value}
                                                {
                                                    SearchMap.size !== index + 1 ? ', ' : ''
                                                }
                                              </Typography>
                                            ))
                                        }
                                        </Typography>
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
                                            SearchResultBooks.length > 0 ? SearchResultBooks.map((book: any, index) => {
                                                return (
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
                                                    />
                                                );
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