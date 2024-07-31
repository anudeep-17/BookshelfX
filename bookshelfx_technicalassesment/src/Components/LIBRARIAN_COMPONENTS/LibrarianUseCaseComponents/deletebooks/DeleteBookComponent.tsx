'use client';
import theme from '@/Components/Themes';
import { Chip, Alert, Box, Button, CircularProgress, CssBaseline, Grid, Pagination, Paper, Snackbar, TextField, ThemeProvider, Toolbar, Typography, Tooltip, FormControl, IconButton, Badge, Autocomplete } from "@mui/material";
import React from 'react';
import { DashboardSize } from "@/Components/DashboardSize";
import { getAllBooksCount, getAuthors, getBooks, getCategories, getPublishers, searchBook } from '@/Services/BookRoutines';
import BookDisplayCard from './BookDisplayCard';
import { BookDetails } from '@/Components/interfaceModels';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DrawerComponent from './DrawerComponent';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { DeleteBook, DeleteBookList } from '@/Services/LibrarianRoutines';

const drawerWidth = DashboardSize;
 
export default function DeleteBookComponent() 
{
    const [Books, setBooks] = React.useState<BookDetails[]>([]);
    const [DeletionList, setDeletionList] = React.useState<BookDetails[]>([]);
    const [Loading, setLoading] = React.useState(false);
    const [Page, setPage] = React.useState(1);
    const [TotalPages, setTotalPages] = React.useState(0);
    const [TotalSelection, setTotalSelection] = React.useState(0);
    
    const [searchType, setSearchType] = React.useState<{ [key: string]: string }>({});
    const [searchResult, setSearchResult] = React.useState<BookDetails[]>([]);

    const [Title, setTitle] = React.useState('');
    const [Author, setAuthor] = React.useState([] as string[]);
    const [Category, setCategory] = React.useState('');
    const [Publisher, setPublisher] = React.useState('');

    const [isDeletionListOpen, setIsDeletionListOpen] = React.useState(false);

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertContent, setAlertContent] = React.useState<{ severity: "success" | "error" | "info" | "warning" | undefined, message: string }>({
        severity: 'success', message: ''
    });

    const [AllAuthors, setAllAuthors] = React.useState<string[]>([]);
    const [AllPublishers, setAllPublishers] = React.useState<string[]>([]);
    const [AllCategories, setAllCategories] = React.useState<string[]>([]);

    React.useEffect(()=>{
        const fetchData = async() => {
           const authors = await getAuthors();
           if(authors.success)
           {
               setAllAuthors(authors.data.flatMap((item: { authors: string }) => item.authors));
           }
           const Categories = await getCategories();
           if(Categories.success)
           {
               setAllCategories(Categories.data);
           }
           const Publishers = await getPublishers();
           if(Publishers.success)
           {
               setAllPublishers(Publishers.data);
           }
       }
       fetchData();
      
   },[])

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

    React.useEffect(() => {
        setTotalSelection(DeletionList.length);
    },[DeletionList])


    const handleCloseAlert = (event: React.SyntheticEvent<any, Event> | Event, reason?: string) => {
        if (reason === 'clickaway') 
        {
          return;
        }
        setAlertOpen(false);
    };

    const handleClickofSearch = async() => {
        const author = Author.length === 0 ? '' : Author.join(',');
        setLoading(true);
        const searchHistory = await searchBook(Title, author, Category, Publisher);
        if(searchHistory.success && searchHistory.data.length !== 0)
        {
            setSearchResult(searchHistory.data);
        }
        else if (searchHistory.success && searchHistory.data.length === 0)
        {
            setSearchResult([]);
            setAlertContent({severity: 'info', message: 'No books found'});
            setAlertOpen(true);
        }
        else
        {
            setAlertContent({severity: 'error', message: searchHistory.message});
            setAlertOpen(true);
        }
       

        let types = {} as { [key: string]: string };

        if (Title !== '') {
            types['Title'] = Title;
        }
        if (Author.length > 0) {
            types['Author'] = Author.join(', ');
        }
        if (Category !== '') {
            types['Category'] = Category;
        }
        if (Publisher !== '') {
            types['Publisher'] = Publisher;
        }
       
        setSearchType(types);
        setLoading(false);
    }

    const handleDeleteBook: (DeleteThisBook: BookDetails) => Promise<void> = async (DeleteThisBook) => {
        if(DeleteThisBook !== undefined)
        {
            setLoading(true);
            const deleteBook = await DeleteBook(DeleteThisBook.title, DeleteThisBook.authors);
            if(deleteBook.success)
            {
                if(Object.keys(searchType).length === 0) 
                {
                    setPage(1);
                } 
                else if(searchResult.length !== 0 || Object.keys(searchType).length !== 0)
                {
                   handleClickofSearch();
                }
                setAlertContent({severity: 'success', message: deleteBook.message});
                setAlertOpen(true);
            }
            else
            {
                setAlertContent({severity: 'error', message: deleteBook.message});
                setAlertOpen(true);
            }
        }
        else
        {
            setAlertContent({severity: 'error', message: 'Book not found'});
            setAlertOpen(true);
        }
    }

    const handleDeleteAll = async() => {
        if(DeletionList.length !== 0)
        {
            setLoading(true);
            const deleteBooks = await DeleteBookList(DeletionList.map((book) => ({title: book.title, authors: book.authors})));
            if(deleteBooks.every((book) => book.success)) 
            {
                    if(Object.keys(searchType).length === 0) 
                    {
                        setPage(1);
                    } 
                    else if(searchResult.length !== 0 || Object.keys(searchType).length !== 0)
                    {
                        setSearchResult(searchResult.filter((book) => !DeletionList.includes(book)));
                    }
                    setAlertContent({severity: 'success', message: 'All books deleted successfully.'});
                    setAlertOpen(true);
                    setDeletionList([]);
            }
            else {
                const unsuccessfulBooks = deleteBooks
                    .filter((book) => !book.success)
                    .map((book, index) => DeletionList[index]);
            
                setDeletionList(unsuccessfulBooks);
                setAlertContent({severity: 'error', message: "Some books couldn't be deleted."});
                setAlertOpen(true);
            }
        }
        else
        {
            setAlertContent({severity: 'error', message: 'No books selected'});
            setAlertOpen(true);
        }
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
                            <Typography variant="h3" sx={{mt:1}}>
                                Delete Books
                            </Typography>
                            <Typography variant="body1" sx={{mb:3, mt:1, color: theme.palette.text.secondary}}>
                                you can select multiple books by either browsing or searching for books
                            </Typography>
                            <Grid gridRow={1} container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Paper elevation={3} sx={{p:2, mb:2, position: 'sticky', top: 70}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={12}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            label="Title"
                                                            value = {Title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            fullWidth
                                                            sx={{mb:2}}
                                                        />

                                                        <Autocomplete
                                                            id="authors"
                                                            multiple
                                                            options={AllAuthors}
                                                            value={Author}
                                                            onChange={(event, newInputValue) => {
                                                                setAuthor(newInputValue);
                                                            }}
                                                            renderInput={(params) => <TextField {...params} label="Authors" fullWidth variant="outlined" sx={{mb: 2}}/>}
                                                            renderTags={(value, getTagProps) =>
                                                            value.map((option, index) => (
                                                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                            ))
                                                            }
                                                        />


                                                        <Autocomplete
                                                            id="combo-box-demo"
                                                            options={AllCategories}
                                                            value={Category}
                                                            freeSolo
                                                            onInputChange={(event, newInputValue) => { 
                                                                setCategory(newInputValue);
                                                            }}
                                                            renderInput={(params) => <TextField {...params} label="Category" fullWidth variant="outlined" sx={{mb: 2}}/>}
                                                        />

                                                         <Autocomplete
                                                            id="publishers"
                                                            options={AllPublishers}
                                                            value={Publisher}
                                                            onInputChange={(event, newInputValue) => {
                                                                setPublisher(newInputValue);
                                                            }}
                                                            renderInput={(params) => <TextField {...params} label="Publishers" fullWidth variant="outlined"/>}
                                                        />
                                                        <Button variant="contained" sx={{mt:2}} onClick={handleClickofSearch}>Search for books</Button>
                                                        <Button 
                                                            variant="outlined" 
                                                            sx={{mt:2}} 
                                                            onClick={() => {
                                                                setSearchType({});
                                                                setTitle('');
                                                                setAuthor([]);
                                                                setCategory('');
                                                                setPublisher('');
                                                                setSearchResult([]);    
                                                            }}
                                                            disabled={Object.keys(searchType).length === 0}
                                                        >
                                                            Show All Books
                                                        </Button>

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
                                            {
                                                searchResult.length !== 0 ?
                                                <>
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
                                                </Box></>:
                                                <Typography variant="h4" sx={{mb:1}}>
                                                 All Books
                                                </Typography>
                                            }

                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb:1 }}>
                                                <Tooltip title="Select books to add to deletion list" placement='top'>
                                                    <IconButton onClick={()=> {setIsDeletionListOpen(true)}}>
                                                        <Badge badgeContent={TotalSelection} color="primary">
                                                            <ProductionQuantityLimitsIcon fontSize="large" sx={{
                                                                color: theme.palette.text.secondary
                                                            }} />
                                                        </Badge>
                                                    </IconButton>
                                                </Tooltip>
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
                                                            <BookDisplayCard key={book.ISBN} book={book} setDeletionList={setDeletionList} setAlertOpen={setAlertOpen} setAlertContent={setAlertContent} handleDeleteBook={handleDeleteBook}/>
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
                    {
                        isDeletionListOpen? 
                        <DrawerComponent DeletionList={DeletionList} setDeletionList={setDeletionList} open={isDeletionListOpen} setOpen={setIsDeletionListOpen} handleDeleteAll = {handleDeleteAll}/>
                        :
                        null
                    }
            </Box>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} severity={alertContent.severity}>
                {alertContent.message}
              </Alert>
            </Snackbar>
        </ThemeProvider>
    )
}