import React from 'react';
import { Box, Button, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import theme from '../../../Themes';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import BookCategory from "../../../Mock-BookCategory.json";
import {Book, BookCardProps} from '@/Components/interfaceModels';
import dynamic from 'next/dynamic';
import { ChevronLeft } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { getBook, getCategories } from '@/Services/BookRoutines';

const DetailedBookCard = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookList/DetailedBookCard'), { ssr: false });

export default function BookList() 
{
    const pathname = usePathname();
    const [books, setBook] = React.useState<Book[]>([])
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getBook();
            if (data.success) {
                setBook(data.data);
            }
        };

        fetchData();
    }, []);


    const [selectedChip, setSelectedChip] =  React.useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const [allCategory, setCategory] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getCategories();
            if (data.success) {
                const categories = data.data.map((item: { category: any; }) => item.category);
                setCategory(categories);
            }
        };

        fetchData();
    }, []);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [filterdraweropen, setFilterDrawerOpen] = React.useState(false);

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

    function handleSort(sortBy: string){
        if(sortBy === 'title')
        {
            setBook(sortBooksByTitle(books));
        }
        else if(sortBy === 'author')
        {
            setBook(sortBooksByAuthor(books));
        }
        else if(sortBy === 'Category')
        {
            setCategory(allCategory.sort());
        }
        handleSortClose();
    }


    function slidervaluetext_forDays(value: number) {
        return `${value} days`;
    }

    function sortBooksByTitle(books: Book[]) {
        return [...books].sort((a, b) => a.title.localeCompare(b.title));
    }

    function sortBooksByAuthor(books: Book[]) {
        return [...books].sort((a, b) => {
            let comparison = 0;
            const maxAuthors = Math.max(a.authors.length, b.authors.length);
    
            for (let i = 0; i < maxAuthors; i++) {
                const authorA = a.authors[i] || '';
                const authorB = b.authors[i] || '';
                comparison = authorA.localeCompare(authorB);
    
                if (comparison !== 0) {
                    // If the authors at the current index are not the same, break the loop
                    break;
                }
            }
    
            return comparison;
        });
    }
    

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <IconButton
                onClick={toggleDrawer(false)}
            >
                <ChevronLeft sx={{fontSize: '2rem'}} />
            </IconButton>
            <Typography variant="h5" sx={{ mt: 2, mb: 2, ml: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <FilterAltIcon sx={{ color: 'primary.main' }} />
                Filter Books
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'center', ml: 2, mr: 2 }}>
                <Typography variant="body2" sx={{ mt: 2}}>
                    Filter by availability
                </Typography>
                <Stack direction="column" spacing={1} sx={{ mt: 2, mb: 2}}>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            color="primary"
                            label="Available"
                            variant={selectedChip === 'Available' ? 'filled' : 'outlined'}
                            clickable
                            onClick={() => setSelectedChip('Available')}
                        />
                        <Chip
                            color="primary"
                            label="Not Available"
                            variant={selectedChip === 'Not Available' ? 'filled' : 'outlined'}
                            clickable
                            onClick={() => setSelectedChip('Not Available')}
                        />
                    </Stack>
                    <Typography variant="body2" sx={{ mt: 2}}>
                        Available Within
                    </Typography>
                    <Slider
                        defaultValue={1}
                        getAriaValueText={slidervaluetext_forDays}
                        valueLabelDisplay="auto"
                        shiftStep={1}
                        step={1}
                        marks
                        min={1}
                        max={10}
                    />
                </Stack>
            </Box>
            
            <Divider sx={{ml:2, mr:2}}/>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'center', ml: 2, mr: 2 }}>
                <Typography variant="body2" sx={{ mt: 2}}>
                    Filter by Author
                </Typography>
                <Stack direction="row" spacing={0} sx={{ mt: 2, mb: 2, display:'flex', flexWrap:'wrap'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            mr:1
                        }}
                    >
                        <Checkbox/>
                        <Typography variant="body2">
                            Author 1
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <Checkbox/>
                        <Typography variant="body2">
                            Author 2
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            mr:1
                        }}
                    >
                        <Checkbox/>
                        <Typography variant="body2">
                            Author 3
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <Checkbox/>
                        <Typography variant="body2">
                            Author 4
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Divider sx={{ml:2, mr:2}}/>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', ml: 2, mr: 2, mt:2}}>
                <Button variant="contained" sx={{mr:1}}>
                    <Typography variant="body2" >
                        Apply Filters
                    </Typography>
                </Button>
                <Button variant="outlined">
                    <Typography variant="body2">
                        Clear Filters
                    </Typography>
                </Button>
            </Box>
        </Box>
    );


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
                                    {/* <Paper elevation={6} square={false} sx={{ backgroundColor: '#ffffff' }}> */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, mb: 1, display: 'inline' }}>
                                                    {pathname === "/allcategory" ? "Category Wise " : pathname === "/allbooks" ? "All " : "Featured "}
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
                                                <Typography variant="body2" sx={{ mt:1, mb:1 }}>
                                                
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
                                                            <MenuItem onClick={() => handleSort("title")}>Sort by book titles</MenuItem>
                                                            <MenuItem onClick={() => handleSort("author")}>Sort by book Author</MenuItem>
                                                            {pathname === "/allcategory" || pathname === "/allbooks" ? <MenuItem onClick={() => handleSort("Category")}>Sort all Categories</MenuItem> : null}
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
                                                                {DrawerList}
                                                            </Drawer>
                                                        </>
                                                    </Tooltip>
                                                </Box>
                                            </Box>                        
                                    {/* </Paper> */}
                                    </Grid>

                                    {pathname === "/allcategory" || pathname === "/allbooks"?
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
                                                BookCategory.bookCategories.map((category: string, index: number) => {
                                                    return (
                                                        <Chip
                                                            key={index}
                                                            label={category}
                                                            color="primary"
                                                            variant={selectedChip === category ? 'filled' : 'outlined'}
                                                            clickable
                                                            onClick={() => setSelectedChip(category)}
                                                        />
                                                    );
                                                })
                                            }
                                            </Stack>
                                        </Box>
                                    </Grid>:null}

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
                                                    books.length>0 ? books.map((book: BookCardProps) => {
                                                        return (
                                                            <DetailedBookCard
                                                                key={book.id}
                                                                coverimage={book.coverimage}
                                                                title={book.title}
                                                                description={book.description}
                                                                rating={book.rating}
                                                                authors={book.authors}
                                                                availability={Boolean(true)}
                                                            />
                                                        );
                                                    }) :
                                                    <Typography variant="h6" sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                            No Books Found
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