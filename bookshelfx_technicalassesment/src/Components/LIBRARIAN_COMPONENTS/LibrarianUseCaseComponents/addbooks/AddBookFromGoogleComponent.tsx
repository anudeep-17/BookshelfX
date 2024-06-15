'use client';
import React, { useEffect } from 'react';
import { DashboardSize } from "@/Components/DashboardSize";
import theme from "@/Components/Themes";
import { Box, Button, CssBaseline, Grid, Pagination, Paper, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { getBooksFromGoogleBooks } from '@/Services/LibrarianRoutines';
import { Book } from '@/Components/interfaceModels';
import BookDisplayCard from './BookDisplayCard';

const drawerWidth = DashboardSize;

export default function AddBookFromGoogleComponent() 
{  
    const [author, setAuthor] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [publisher, setPublisher] = React.useState('');
    const [Books, setBooks] = React.useState<Book[]>([]);
    const [page, setPage] = React.useState(1);
    const [totalBooks, setTotalBooks] = React.useState(0);
    const [searchType, setSearchType] = React.useState<{ [key: string]: string }>({});

    const handleClickofSearch = async() => {
        const data = await getBooksFromGoogleBooks(title, author, publisher, page-1, 10);
        if(data.success && data.data.totalItems > 0)
        {
            setTotalBooks(data.data.totalItems);
            console.log(data.data);
        
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
                pagecount: book.volumeInfo.pageCount || 'N/A',
                rating: book.volumeInfo.averageRating || 'N/A',
                isFeaturedBook: false,  
            }));
        
            setBooks(mappedBooks);
        }

        let types = {} as { [key: string]: string };

        if (title !== '') {
            types['Title'] = title;
        }
        if (author !== '') {
            types['Author'] = author;
        }
        if (publisher !== '') {
            types['Publisher'] = publisher;
        }
        setSearchType(types);
      
    }

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
                                                        <TextField
                                                            label="Author"
                                                            value={author}
                                                            onChange={(e) => setAuthor(e.target.value)}
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
                                            <Typography variant="h4" sx={{mb:2}}>
                                                Search results {Object.keys(searchType).length > 0 && `for ${Object.values(searchType).join(', ')}:`}
                                            </Typography>
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
                                                Books && Books.length > 0 ? Books.map((book: Book) => (
                                                    <BookDisplayCard key={book.ISBN} book={book} />
                                                )) :
                                                <Typography variant="h6" sx={{mt:2}}>
                                                    
                                                </Typography>
                                            }
                                             </Box>
                                            <Pagination 
                                                    count={Math.ceil(totalBooks/10)}
                                                    color="primary" 
                                                    size="large"
                                                    page={ page }
                                                    onChange={(event, page) => {
                                                        setPage(page);
                                                        handleClickofSearch();
                                                    }}
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>              
                        </Box>
            </Box>
        </Box>
        </ThemeProvider>
    )
}