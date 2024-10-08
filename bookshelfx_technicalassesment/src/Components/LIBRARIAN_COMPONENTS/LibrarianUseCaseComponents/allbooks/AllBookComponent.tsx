'use client';
import theme from '@/Components/Themes';
import { Chip, Alert, Box, Button, CircularProgress, CssBaseline, Grid, Pagination, Paper, Snackbar, TextField, ThemeProvider, Toolbar, Typography, Tooltip, FormControl, IconButton, Badge, Autocomplete } from "@mui/material";
import React from 'react';
import { DashboardSize } from "@/Components/DashboardSize";
import { getAllBooksCount, getAuthors, getBooks, getCategories, getPublishers, searchBook } from '@/Services/BookRoutines';
import { BookDetails } from '@/Components/interfaceModels';
import BookDisplayCard from './BookDisplayCard';


const drawerWidth = DashboardSize;


export default function AllBookComponent() 
{
    const [Books, setBooks] = React.useState<BookDetails[]>([]);
    const [Loading, setLoading] = React.useState(false);
    const [Page, setPage] = React.useState(1);
    const [TotalPages, setTotalPages] = React.useState(0);
    
    const [searchType, setSearchType] = React.useState<{ [key: string]: string }>({});
    const [searchResult, setSearchResult] = React.useState<BookDetails[]>([]);

    const [Title, setTitle] = React.useState('');
    const [Author, setAuthor] = React.useState([] as string[]);
    const [Category, setCategory] = React.useState('');
    const [Publisher, setPublisher] = React.useState('');
    const [alertOpen, setAlertOpen] = React.useState(false);

    const [alertContent, setAlertContent] = React.useState<{ severity: "success" | "error" | "info" | "warning" | undefined, message: string }>({
        severity: 'success', message: ''
    });

     
    React.useEffect(() => {
        const fetchCount = async () => {
            setLoading(true);
            const count = await getAllBooksCount();
            if(count.success)
            {
                setTotalPages(Math.ceil(count.data/10));
            }
            setLoading(false);
        }

        fetchCount();
    },[])

    React.useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            const books = await getBooks(Page, 10);
            if(books.success)
            {
                setBooks(books.data);
            }
            setLoading(false);
        }
        fetchBooks();
    },[Page])

 


    const handleCloseAlert = (event: React.SyntheticEvent<any, Event> | Event, reason?: string) => {
        if (reason === 'clickaway') 
        {
          return;
        }
        setAlertOpen(false);
    };

     

    return (
        <ThemeProvider theme={theme}>
           <CssBaseline />  
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
                                p:1.5,
                            }}
                        >
                            <Typography variant="h3" sx={{mt:1}}>
                               All Books
                            </Typography>
                            <Typography variant="body1" sx={{mb:3, mt:1, color: theme.palette.text.secondary}}>
                               View any book in the library by click on the book card
                            </Typography>
                            <Grid gridRow={1} container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <Paper elevation={3} sx={{p:2, mb:2}}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignContent: 'center',
                                                p:1.5,
                                              
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignContent: 'center',
                                                    gap:3,
                                                    mb: 2,
                                                    mt:2
                                                }}
                                            >
                                                {
                                                    Loading ? 
                                                        <CircularProgress 
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                alignContent: 'center',
                                                                mt: 5,
                                                            }}
                                                        /> :
                                                        (Object.keys(searchType).length !== 0 && searchResult.length !== 0 ? searchResult : Books).length !== 0 ?
                                                        (Object.keys(searchType).length !== 0 && searchResult.length !== 0 ? searchResult : Books).map((book) => (
                                                            <BookDisplayCard key={book.ISBN} book={book}  setAlertOpen={setAlertOpen} setAlertContent={setAlertContent} />
                                                        )):
                                                        <Typography variant="body1" color="text.secondary">
                                                            No books found
                                                        </Typography>
                                                }
                                            </Box>

                                            <Pagination 
                                                count={Object.keys(searchType).length !== 0 && searchResult.length !== 0 ? Math.ceil(searchResult.length/10) : TotalPages}
                                                color="primary" 
                                                size="large"
                                                page={Page}
                                                onChange={(e, value) => setPage(value)}
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
            </Box>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} severity={alertContent.severity}>
                {alertContent.message}
              </Alert>
            </Snackbar>
        </ThemeProvider>
    )
}