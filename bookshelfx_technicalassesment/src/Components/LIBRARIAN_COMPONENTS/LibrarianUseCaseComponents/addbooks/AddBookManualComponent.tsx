'use client';
import React from 'react';
import { DashboardSize } from "@/Components/DashboardSize";
import theme from "@/Components/Themes";
import { Alert, Autocomplete, Box, Button, Chip, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel,  Paper, Rating, Select, Snackbar, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material";
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import ImageUrlDialog from './ImageUrlDialog';
import Image from 'next/image';
import { addBookToLibrary, getAuthors, getCategories, getPublishers } from '@/Services/BookRoutines';
import { useRouter } from 'next/navigation';

const drawerWidth = DashboardSize;

export default function AddBookManualComponent() 
{
    const [showImageDialog, setShowImageDialog] = React.useState(false);
    const [bookImage, setBookImage] = React.useState('');  
    const [bookTitle, setBookTitle] = React.useState('');
    const [bookISBN, setBookISBN] = React.useState('');
    const [authors, setAuthors] = React.useState([] as string[]);
    const [rating, setRating] = React.useState(0);
    const [category, setCategory] = React.useState('');
    const [pageCount, setPageCount] = React.useState(0);
    const [publisher, setPublisher] = React.useState('');
    const [publishedDate, setPublishedDate] = React.useState(dayjs(new Date()));
    const [bookDescription, setBookDescription] = React.useState('');
    const [availability, setAvailability] = React.useState(true);
    const [IsFeaturedBook, setIsFeaturedBook] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertContent, setAlertContent] = React.useState<{ severity: "success" | "error" | "info" | "warning" | undefined, message: string }>({
        severity: 'success', message: ''
    });

    const [confirmationText, setConfirmationText] = React.useState('' as string);
    const [showConfirmationDialog, setshowConfirmationDialog] = React.useState(false);

    const [AllAuthors, setAllAuthors] = React.useState<string[]>([]);
    const [AllPublishers, setAllPublishers] = React.useState<string[]>([]);
    const [AllCategories, setAllCategories] = React.useState<string[]>([]);

    const router = useRouter();

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


    function onClear()
    {
        setBookImage('');
        setBookTitle('');
        setAuthors([]);
        setRating(0);
        setCategory('');
        setPageCount(0);
        setPublisher('');
        setPublishedDate(dayjs());
        setBookDescription('');
        setAvailability(true);
        setIsFeaturedBook(false);

        setShowAlert(true);
        setAlertContent({severity: 'info', message: 'Fields Cleared.'});
    }

    async function onAddBook()
    {
        if(!bookTitle  || !authors)
        {
            setShowAlert(true);
            return setAlertContent({severity: 'error', message: 'Please fill in all required fields.'});
        }

        const response = await addBookToLibrary({
            title: bookTitle || 'N/A',
            authors: authors.length > 0 ? authors : ['N/A'],
            description: bookDescription || 'N/A',
            ISBN: bookISBN || 'N/A',
            coverimage: bookImage || 'N/A',
            availability: availability !== undefined ? availability : true,
            category: category || 'N/A',
            publisher: publisher || 'N/A',
            publishedDate: publishedDate ? publishedDate.toDate() : new Date(),
            pagecount: pageCount || 0,
            rating: rating || 0,
            isFeaturedBook: IsFeaturedBook !== undefined ? IsFeaturedBook : false
          });
        
        if(response.success)
        {
            setShowAlert(true);
            setAlertContent({severity: 'success', message: 'Book has been added successfully.'});
            window.open(`/librarian/book/${response.book.id}`, '_blank');
            onClear();
        }
        else
        {
            setShowAlert(true);
            setAlertContent({severity: 'error', message: 'An error occurred while adding book.'});
        }

    }

    const onClose = () => 
    {
        setShowImageDialog(false);
    }  

    const onClickofImage = () =>
    {
        setShowImageDialog(true);
    }

    const handleCloseAlert = (event: React.SyntheticEvent<any, Event> | Event, reason?: string) => {
        if (reason === 'clickaway') 
        {
          return;
        }
        setShowAlert(false);
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
                            p:1.5
                        }}
                        >
                            <Typography variant="h3" sx={{mb:2}}>
                                Add a <span style={{color: theme.palette.text.secondary,}}>new book</span> to the library
                            </Typography>
                            <Paper elevation={3} sx={{p:2, mb:2, width:'100%'}}>
                                    <Grid container spacing={1}>
                                    <Grid item xs={12} sm={4}>
                                        <Box 
                                            component="label" 
                                            htmlFor="upload-button"
                                            sx={{ 
                                                width: 350,
                                                height: 450,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px dashed grey',
                                                mb:2,
                                            }}
                                        >
                                            {
                                                bookImage.length > 0 ?
                                                <Box sx={{ position: 'relative', width: 350, height: 450, '&:hover button': { opacity: 1} }}>
                                                    <Box sx={{ 
                                                        position: 'absolute', 
                                                        top: 0, 
                                                        right: 0, 
                                                        bottom: 0, 
                                                        left: 0,
                                                        '&:hover::after': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        left: 0,
                                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                        },
                                                    }}>
                                                        <Image src={bookImage} alt="Book Image" width={350} height={450}/>
                                                    </Box>
                                                    <Button 
                                                        sx={{ 
                                                            position: 'absolute', 
                                                            top: '50%', 
                                                            left: '50%', 
                                                            transform: 'translate(-50%, -50%)', 
                                                            opacity: 0,  
                                                            transition: 'opacity 0.3s' 
                                                        }}
                                                        variant="contained"
                                                        onClick={onClickofImage}
                                                    >
                                                        Edit Image
                                                    </Button>
                                                </Box>
                                                :
                                                <>
                                                    <Button variant="contained" component="span" onClick={onClickofImage}>
                                                        Upload Image
                                                    </Button>
                                                </>
                                            }

                                            {
                                                showImageDialog &&
                                                <ImageUrlDialog bookImage={bookImage} setBookImage={setBookImage} open={showImageDialog} onClose={onClose}/>
                                            }

                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={8}>
                                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="Book Title"
                                                    variant="outlined"
                                                    sx={{mb:2}}
                                                    value={bookTitle}
                                                    onChange={(e) => setBookTitle(e.target.value)}
                                                />
                                        </Box>

                                        <Autocomplete
                                                id="authors"
                                                multiple
                                                options={AllAuthors}
                                                value={authors}
                                                onChange={(event, newInputValue) => {
                                                  setAuthors(newInputValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Authors" fullWidth variant="outlined" sx={{mb: 2}}/>}
                                                renderTags={(value, getTagProps) =>
                                                  value.map((option, index) => (
                                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                  ))
                                                }
                                        />

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Typography variant="body1" sx={{
                                                mr:1
                                            }}>
                                                Rating: 
                                            </Typography>
                                            <Rating value={rating}onChange={(event, newValue) => { setRating(newValue !== null ? newValue : 0);}}/>
                                        </Box>

                                        <Autocomplete
                                                  id="combo-box-demo"
                                                  options={AllCategories}
                                                  value={category}
                                                  freeSolo
                                                  onInputChange={(event, newInputValue) => {
                                                   setCategory(newInputValue);
                                                  }}
                                                  renderInput={(params) => <TextField {...params} label="Category" fullWidth variant="outlined" sx={{mb: 2}}/>}
                                        />

                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            label="Page Count"
                                            variant="outlined"
                                            type="number"
                                            InputProps={{ inputProps: { min: 0 } }}
                                            sx={{mb:2}}
                                            value = {pageCount}
                                            onChange={(e) => setPageCount(Number(e.target.value))}
                                        />

                                        <Autocomplete
                                                id="publishers"
                                                options={AllPublishers}
                                                value={publisher}
                                                onInputChange={(event, newInputValue) => {
                                                    setPublisher(newInputValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Publishers" fullWidth variant="outlined" sx={{mb: 2}}/>}
                                        />  

                                         
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoItem sx={{ mb:2 }}>
                                                <DatePicker 
                                                    value={dayjs(publishedDate || 'N/A')} 
                                                    onChange={(newValue) => {
                                                        setPublishedDate(newValue || dayjs());
                                                    }}
                                                />
                                            </DemoItem>
                                        </LocalizationProvider>

                                        <TextField
                                                id="outlined-multiline-static"
                                                label="Book Description"
                                                multiline
                                                rows={7}
                                                fullWidth
                                                variant="outlined"
                                                sx={{mb:2}}
                                                value={bookDescription}
                                                onChange={(e) => setBookDescription(e.target.value)}
                                            />
                                        
                                        <FormControl fullWidth sx={{mb:2}}>
                                            <InputLabel id="availability-select-label">Is Featured Book</InputLabel>
                                            <Select
                                                labelId="availability-select-label"
                                                id="availability-select"
                                                value={IsFeaturedBook}
                                                label="Availability"
                                                onChange={(e) => setIsFeaturedBook(e.target.value as boolean)}
                                            >
                                                <MenuItem value="true">True</MenuItem>
                                                <MenuItem value="false">False</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth sx={{mb:2}}>
                                            <InputLabel id="availability-select-label">Availability</InputLabel>
                                            <Select
                                                labelId="availability-select-label"
                                                id="availability-select"
                                                value={availability}
                                                label="Availability"
                                                onChange={(e) => setAvailability(e.target.value as boolean)}
                                            >
                                                <MenuItem value="true">True</MenuItem>
                                                <MenuItem value="false">False</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="outlined" sx={{mt:2, mr:2}} onClick={onClear}>
                                        Clear Fields
                                    </Button>
                                    <Button variant="contained" sx={{mt:2}} onClick={()=>{setshowConfirmationDialog(true)}}>
                                        Add Book
                                    </Button>
                                </Box>

                            </Paper>
                        </Box>
                    </Box>
                </Box>
                {
                    showConfirmationDialog && 
                    <Dialog
                        open={showConfirmationDialog}
                        onClose={()=>{setshowConfirmationDialog(false)}}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Adding Book To Shelf"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Typography variant= "body1" sx={{
                                    mb:1, 
                                    color: theme.palette.text.secondary,
                                }}>
                                    Please confirm all book Details by typing "ADDBOOK" in the text field below.
                                </Typography>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Confirmation"
                                    type="text"
                                    fullWidth
                                    value = {confirmationText}
                                    onChange={(e) => setConfirmationText(e.target.value)}
                                />
                            </DialogContentText>
                            
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>{setshowConfirmationDialog(false)}}>Cancel</Button>
                            <Button onClick={() => {onAddBook(); setshowConfirmationDialog(false);}} autoFocus disabled={confirmationText!=="ADDBOOK"}>
                              Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

                <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alertContent.severity}>
                        {alertContent.message}
                    </Alert>
                </Snackbar>
        </ThemeProvider>
    )
}