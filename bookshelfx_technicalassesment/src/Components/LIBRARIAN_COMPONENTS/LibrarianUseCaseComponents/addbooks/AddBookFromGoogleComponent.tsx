'use client';
import React from 'react';
import { DashboardSize } from "@/Components/DashboardSize";
import theme from "@/Components/Themes";
import { Chip, Alert, Box, Button, CircularProgress, CssBaseline, Grid, Pagination, Paper, Snackbar, TextField, ThemeProvider, Toolbar, Typography, Tooltip } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { getBooksFromGoogleBooks } from '@/Services/LibrarianRoutines';
import { Book } from '@/Components/interfaceModels';
import BookDisplayCard from './BookDisplayCard';
import { useRouter } from 'next/navigation';

const drawerWidth = DashboardSize;

export default function AddBookFromGoogleComponent() 
{  
    const [authors, setAuthors] = React.useState<string[]>([])
    const [input, setInput] = React.useState('')
    const [title, setTitle] = React.useState('');
    const [publisher, setPublisher] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [Books, setBooks] = React.useState<Book[]>([]);
    const [page, setPage] = React.useState(1);
    const [searchType, setSearchType] = React.useState<{ [key: string]: string }>({});
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertContent, setAlertContent] = React.useState<{ severity: "success" | "error" | "info" | "warning" | undefined, message: string }>({
        severity: 'success', message: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [totalItems, setTotalItems] = React.useState(0);
    
 
    
    const handleClickofSearch = async() => {
        const author = authors.join(', ');
        const data = await getBooksFromGoogleBooks(title, author, publisher, category, page-1, 10);
        if(data.success && data.data.totalItems > 0)
        {
            setTotalItems(data.data.totalItems);

            const googleBooks = data.data.items;
            const mappedBooks: Book[] = googleBooks.map((book: any) => ({
                ISBN: book.volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A',
                coverimage: book.volumeInfo.imageLinks?.thumbnail || 'N/A',
                title: book.volumeInfo.title || 'N/A',
                authors: book.volumeInfo.authors || 'N/A',
                description: book.volumeInfo.description || 'N/A',
                availability: true,  
                category: book.volumeInfo.categories?.[0] || 'N/A',
                publisher: book.volumeInfo.publisher || 'N/A',
                publishedDate: book.volumeInfo.publishedDate ? new Date(book.volumeInfo.publishedDate) : 'N/A',
                pagecount: book.volumeInfo.pageCount || 0,
                rating: book.volumeInfo.averageRating || 0,
                isFeaturedBook: false,  
            }));

            setBooks(mappedBooks);
        }
        else if(Books.length > 0)
        {
            setBooks([]);
            setTotalItems(0);
        }

        let types = {} as { [key: string]: string };

        if (title !== '') {
            types['Title'] = title;
        }
        if (authors.length > 0) {
            types['Author'] = authors.join(', ');
        }
        if (category !== '') {
            types['Category'] = category;
        }
        if (publisher !== '') {
            types['Publisher'] = publisher;
        }
       
        setSearchType(types);
      
    }
 
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
                            <Typography variant="h3" sx={{mb:3, mt:1}}>
                                Add a <span style={{color: theme.palette.text.secondary,}}>new book</span> to the library from Google Books
                            </Typography>
                            <Grid gridRow={1} container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Paper elevation={3} sx={{p:2, mb:2}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={12}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            label="Title"
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            fullWidth
                                                            sx={{mb:2}}
                                                        />

                                                        <Tooltip title="You can enter multiple authors, press enter for each"> 
                                                            <TextField
                                                                label="Author"
                                                                value={input}
                                                                onChange={(e) => setInput(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    setAuthors([...authors, input])
                                                                    setInput('')
                                                                }
                                                                }}
                                                                sx={{mb:2}}
                                                            />
                                                        </Tooltip>

                                                        {
                                                            authors.length>0?  
                                                                authors.map((author, index) => (
                                                                    <Chip
                                                                        label={author}
                                                                        onDelete={() => {
                                                                            const newAuthors = [...authors]
                                                                            newAuthors.splice(index, 1)
                                                                            setAuthors(newAuthors)
                                                                        }}
                                                                        variant="outlined"
                                                                        color="primary"
                                                                        sx={{mb:1.5, width: '100%'}}
                                                                        key={index}
                                                                        dir="ltr"
                                                                    />
                                                            
                                                                )): 
                                                                <Typography variant="body2" color="text.primary" textAlign={'center'} sx={{mb:2}}>
                                                                Please add an author
                                                                </Typography>
                                                        }

                                                        <TextField
                                                            label="Category"
                                                            value={category}
                                                            onChange={(e) => setCategory(e.target.value)}
                                                            sx={{mb:2}}
                                                        />

                                                        <TextField
                                                            label="Publisher"
                                                            value={publisher}
                                                            onChange={(e) => setPublisher(e.target.value)}
                                                        />

                                                        <Button variant="contained" sx={{mt:2}} onClick={handleClickofSearch}>Search on google book </Button>
                                                    </FormControl>
                                                </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                
                                <Grid item xs={12} sm={8}>
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
                                            <Typography variant="h4">
                                                Search results 
                                                {Object.keys(searchType).length > 0 && ` for:`}
                                            </Typography>
                                            <Box display="flex" flexDirection="row" flexWrap="wrap" sx={{
                                                mb:3
                                            }}>
                                                {Object.entries(searchType).map(([key, value]) => (
                                                    <Box display="flex" flexDirection="row" alignItems="center" sx={{
                                                        mr:2
                                                    }}>
                                                        <Typography variant="body1" color="text.secondary" key={key} sx={{mr: 1}}>
                                                            {`${key}:`}
                                                        </Typography>
                                                        <Typography variant="body1" color="primary" key={value}>
                                                            {value}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
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
                                                }}
                                            >
                                            {
                                              isLoading ? (
                                                <CircularProgress /> 
                                              ) : (
                                                Books && Books.length > 0 ? Books.map((book: Book) => (
                                                  <BookDisplayCard 
                                                    key={book.ISBN} 
                                                    book={book} 
                                                    setAlertOpen={setAlertOpen}
                                                    setAlertContent={setAlertContent}
                                                  />
                                                )) :
                                                ((title || authors.length>0 || publisher || category) && Books.length === 0) ? 
                                                <Typography variant="h6" sx={{mt:2, color: theme.palette.primary.main}}>
                                                  No Books found
                                                </Typography> :
                                                <Typography variant="h6" sx={{mt:2}}>
                                                </Typography>
                                              )
                                            }
                                             </Box>
                                            <Pagination 
                                                    count={Math.ceil(totalItems/10)}
                                                    color="primary" 
                                                    size="large"
                                                    page={ page }
                                                    onChange={async (event, page) => {
                                                        setPage(page);
                                                        setIsLoading(true); // start loading
                                                        await handleClickofSearch();
                                                        setIsLoading(false); // end loading
                                                    }}
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>              
                        </Box>
            </Box>

            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} severity={alertContent.severity}>
                {alertContent.message}
              </Alert>
            </Snackbar>
        
        </Box>
        </ThemeProvider>
    )
}