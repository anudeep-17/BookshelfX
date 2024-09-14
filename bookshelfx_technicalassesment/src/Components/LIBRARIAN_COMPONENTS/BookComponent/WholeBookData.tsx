'use Client';
import React from 'react';
import { Autocomplete, Box, Button, Chip, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Rating, Select, Skeleton, TextField, ThemeProvider, Toolbar, Tooltip, Typography } from '@mui/material';
import theme from '../../Themes';
import { getBookByID } from '@/Services/BookRoutines';
import { DashboardSize } from "@/Components/DashboardSize";
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { usePathname, useSearchParams } from 'next/navigation';
import ChatboxComponent from '@/Components/ChatBox/ChatboxComponent';
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import bookcover from '@/assets/bookcover.png'
import { BookDetails } from '../../interfaceModels';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { getAuthors, getCategories, getPublishers } from '@/Services/BookRoutines';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DialogComponentForHistory from './DialogComponentForHistory';


const drawerWidth = DashboardSize;
const OPTIONS: EmblaOptionsType = { loop: true }

export default function WholeBookData({id}:{id: string})
{
    const pathname = usePathname();
    const searchURLParameters = useSearchParams();
    const [book, setBook] = React.useState<BookDetails>();
    const [confetti, setConfetti] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState<{severity: 'success' | 'error', message: string}>({severity: 'success', message: ""});
    const [Alertopen, setAlertOpen] = React.useState(false);    
    const [isEditing, setIsEditing] = React.useState(false);

    //==========================================================[For information]=========================================
    const [title, setTitle] = React.useState<string>('');
    const [authors, setAuthors] = React.useState<string[]>([]);
    const [description, setDescription] = React.useState<string>('');
    const [category, setCategory] = React.useState<string>('');
    const [publisher, setPublisher] = React.useState<string>('');
    const [pageCount, setPageCount] = React.useState<number>(0);
    const [rating, setRating] = React.useState<number>(0);
    const [publishedDate, setPublishedDate] = React.useState<Date>(new Date());
    const [isFeaturedBook, setIsFeaturedBook] = React.useState<boolean>(false);
    const [availability, setAvailability] = React.useState<boolean>(false);

    //===========================================================[For Editing]========================================
    const [editedAuthors, setEditedAuthors] = React.useState<string[]>([]);
    const [editedDescription, setEditedDescription] = React.useState<string>('');
    const [editedCategory, setEditedCategory] = React.useState<string>('');
    const [editedPublisher, setEditedPublisher] = React.useState<string>('');
    const [editedPageCount, setEditedPageCount] = React.useState<number>(0);
    const [editedRating, setEditedRating] = React.useState<number>(0);
    const [editedPublishedDate, setEditedPublishedDate] = React.useState<Date>(new Date());
    const [editedisFeaturedBook, setIsEditedFeaturedBook] = React.useState<boolean>(false);
    const [editedavailability, setEditedAvailability] = React.useState<boolean>(false);
   
    const [AllAuthors, setAllAuthors] = React.useState<string[]>([]);
    const [AllPublishers, setAllPublishers] = React.useState<string[]>([]);
    const [AllCategories, setAllCategories] = React.useState<string[]>([]);

    const [viewRentalHistory, setViewRentalHistory] = React.useState(false);
    const [viewFavouritedBy, setViewFavouritedBy] = React.useState(false);

    const [confirmationText, setConfirmationText] = React.useState('' as string);
    const [showConfirmationDialog, setshowConfirmationDialog] = React.useState({open: false, task: "" as "edit" | "remove"| "none"});

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getBookByID(id);
            if (data.success) {
                setBook(data.data);
            }
            setIsEditing(searchURLParameters.get('isEditing') === 'true');
        };
        const timeoutId = setTimeout(fetchData, 1000); 
    
        return () => clearTimeout(timeoutId);  
    }, [id]);

    React.useEffect(() => {
        if(book !== undefined)
        {
            setTitle(book.title);
            setAuthors(book.authors);
            setDescription(book.description);
            setCategory(book.category);
            setPublisher(book.publisher);
            setPageCount(book.pagecount);
            setRating(book.rating);
            setPublishedDate(book.publishedDate);
            setIsFeaturedBook(book.isFeaturedBook);
            setAvailability(book.availability);

            if(isEditing)
            {
                setEditedAuthors(book.authors);
                setEditedDescription(book.description);
                setEditedCategory(book.category);
                setEditedPublisher(book.publisher);
                setEditedPageCount(book.pagecount);
                setEditedRating(book.rating);
                setEditedPublishedDate(book.publishedDate);
                setIsEditedFeaturedBook(book.isFeaturedBook);
                setEditedAvailability(book.availability);
            }
        }
    }, [book, isEditing]);

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAlertClose = (event: React.SyntheticEvent<any, Event> | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    const ShareBookDialogBox = ({open, setOpen}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
        const handleClose = () => {
            setOpen(false);
        };

        const handleCopyMessage = async () => {
            if(book)
            {
                const publishedDate = new Date(book?.publishedDate);
                const dateString = publishedDate.toDateString();
                const url = window.location.href;
                
                const message = `Have you seen this gem on BookShelfX? "${book.title}" by ${book.authors.join(", ")} is more than just a book; it's an experience. With a gripping narrative and ${book.pagecount} pages of pure intrigue, it's been rated ${book.rating} stars by readers like you. Published by ${book.publisher} on ${dateString}, this ${book.category} masterpiece is now available and flying off the shelves. Dive into its world and see why it's garnered rave reviews. Don't miss out – grab your copy while it's still in stock! \n ${url}`
                try {
                    await navigator.clipboard.writeText(message);
                    setAlert({severity: "success", message: "a Message copied to clipboard"});
                } catch (err) {
                    setAlert({severity: "error", message: "Failed to copy message"});
                }
                setAlertOpen(true);
            }
            else
            {
                setAlert({severity: "error", message: "Failed to copy message"});
                setAlertOpen(true);
            }
          
        }

        const handleShareViaWhatsApp = () => 
        {
            if(book)
            {
                const publishedDate = new Date(book.publishedDate);
                const dateString = publishedDate.toDateString();

                if(navigator.userAgent.includes("Android") || navigator.userAgent.includes("iPhone"))
                {
                   
                    const message = `Have you seen this gem on BookShelfX? "${book.title}" by ${book.authors.join(", ")} is more than just a book; it's an experience. With a gripping narrative and ${book.pagecount} pages of pure intrigue, it's been rated ${book.rating} stars by readers like you. Published by ${book.publisher} on ${dateString}, this ${book.category} masterpiece is now available and flying off the shelves. Dive into its world and see why it's garnered rave reviews. Don't miss out – grab your copy while it's still in stock!`
                                    
                    const url = window.location.href;
                    const whatsappUrl = `whatsapp://send?text=${message}%0A${url}`;
                    window.open(whatsappUrl);
                }
                else
                {
                    const message = `Have you seen this gem on BookShelfX? "${book.title}" by ${book.authors.join(", ")} is more than just a book; it's an experience. With a gripping narrative and ${book.pagecount} pages of pure intrigue, it's been rated ${book.rating} stars by readers like you. Published by ${book.publisher} on ${dateString}, this ${book.category} masterpiece is now available and flying off the shelves. Dive into its world and see why it's garnered rave reviews. Don't miss out – grab your copy while it's still in stock!`
                    const url = window.location.href;
                    window.open(`https://web.whatsapp.com/send?text=${message}%0A${url}`, '_blank');
                }
                
            }
            else
            {
                setAlert({severity: "error", message: "Failed to share book via WhatsApp"});
                setAlertOpen(true);
            }
        }

        const handleShareViaEmail = () => 
        {
            if(book)
            {
                const publishedDate = new Date(book.publishedDate);
                const dateString = publishedDate.toDateString();
                
                const message = `Have you seen this gem on BookShelfX? "${book.title}" by ${book.authors.join(", ")} is more than just a book; it's an experience. With a gripping narrative and ${book.pagecount} pages of pure intrigue, it's been rated ${book.rating} stars by readers like you. Published by ${book.publisher} on ${dateString}, this ${book.category} masterpiece is now available and flying off the shelves. Dive into its world and see why it's garnered rave reviews. Don't miss out – grab your copy while it's still in stock!`
                                
                const url = window.location.href;
                window.open(`mailto:?subject=Check out this book: ${book.title}&body=${message}%0A${url}`, '_blank');
            }
            else
            {
                setAlert({severity: "error", message: "Failed to share book via Email"});
                setAlertOpen(true);
            }    
        }

        const handleShareViaLink = async() => 
        {
            const url = window.location.href;
            try {
                await navigator.clipboard.writeText(url);
                setAlert({severity: "success", message: "URL copied to clipboard"});
            } catch (err) {
                setAlert({severity: "error", message: "Failed to copy URL"});
            }
            setAlertOpen(true);
        }
        

        return (
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
               Share the Book with your friends
            </DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You can share the book with your friends with following options
              </DialogContentText>
                <DialogActions sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    p:2
                }}>
                    <IconButton onClick={()=> {handleCopyMessage(); handleClose(); }} color="primary">
                        <Tooltip title="Copy a message to share book">
                            <ContentCopyIcon sx={{
                                fontSize: 30,
                            }}/>
                        </Tooltip>
                    </IconButton>
                    <IconButton onClick={()=> {handleShareViaWhatsApp(); handleClose(); }} color="primary">
                        <Tooltip title="Share book via WhatsApp">
                            <WhatsAppIcon sx={{
                                fontSize: 30,
                            }}/>
                        </Tooltip>
                    </IconButton>
                    <IconButton onClick={()=> {handleShareViaEmail(); handleClose(); }} color="primary">
                        <Tooltip title="Share book via Email">
                            <EmailIcon sx={{
                                fontSize: 30,
                            }}/>
                        </Tooltip>
                    </IconButton>
                    <IconButton onClick={()=> {handleShareViaLink(); handleClose(); }} color="primary">
                        <Tooltip title="Share book via Link">
                            <LinkIcon sx={{
                                fontSize: 30,
                            }}/>
                        </Tooltip>
                    </IconButton>
                </DialogActions>
            </DialogContent>

            <DialogActions>
              <Button variant='contained' onClick={handleClose}>close</Button>              
            </DialogActions>
          </Dialog>
        )
    }
    
    const onRentalHistory = () => {
        if(book?.rentals.length === 0)
        {
            return "No Rentals found for this book";
        }
        else
        {
            let rentalhistory = book?.rentals.map((rental, index) => (
                `Rental Number: ${index + 1}: 
                Rental ID: ${rental.id}
                Rented By User: ${rental.userId}
                Rental Date: ${new Date(rental.rentalDate).toLocaleString()}
                ${rental.returned ? `Return Date: ${new Date(rental.returnDate || '').toLocaleString()}` : ''}
                Returned: ${rental.returned ? 'Yes' : 'No'}
                Is Overdue: ${rental.isOverdue ? 'Yes' : 'No'}
                Rental Closed by Librarian: ${rental.librarianId}`
            )).join('\n\n');
            return "Rental History: "+rentalhistory;
        }
    }

    const onFavoriteBy = () => {
        if(book?.favoritedBy?.length === 0)
        {
            return "No users have favourited this book";
        }
        else
        {
            let favoritedBy = book?.favoritedBy?.map((favorite, index) => (
                `User ${index + 1}: 
                User ID: ${favorite.userId}`
            )).join('\n\n');
            return "Book is favourited by: "+favoritedBy;
        }
    }
     
    return(
        <ThemeProvider theme={theme}>
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
                    <Paper elevation={3} sx={{p:2, mb:2}}>
                        {book? <Grid container spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <Box 
                                    component="img" 
                                    src={book?.coverimage !== 'N/A'? book?.coverimage : bookcover.src} 
                                    alt={book?.title} 
                                    sx={{ 
                                        width: 350,
                                        height: 450,
                                        objectFit: 'cover',
                                        mb:2,
                                        }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Typography variant="h5" sx={{mb:1}}>
                                        {book?.title}
                                    </Typography>
                                    <Box>
                                        <IconButton sx={{mb: 1, mr:1}} onClick={()=>{setIsEditing(true)}}>
                                            <Tooltip title="Edit book">
                                                <EditIcon sx={{color: theme.palette.primary.main,}} />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton sx={{mb: 1, mr:1}} onClick={()=>{setshowConfirmationDialog({open:true, task:'remove'})}}>
                                            <Tooltip title="Delete Book">
                                                <DeleteIcon sx={{color: theme.palette.primary.main,}} />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton sx={{mb: 1}} onClick={handleClickOpen}>
                                            <Tooltip title="Share Book">
                                                <ShareIcon sx={{color: theme.palette.primary.main,}} />
                                            </Tooltip>
                                        </IconButton>
                                        <ShareBookDialogBox open={open} setOpen={setOpen}/>
                                    </Box>
                                    
                                </Box>
                                    {
                                        isEditing ?
                                        <>
                                              <Autocomplete
                                                id="authors"
                                                multiple
                                                options={AllAuthors}
                                                value={editedAuthors}
                                                onChange={(event, newInputValue) => {
                                                  setEditedAuthors(newInputValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Authors" fullWidth variant="outlined" sx={{mb: 2}}/>}
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => {
                                                        const tagProps = getTagProps({ index });
                                                        return <Chip variant="outlined" label={option} {...tagProps} key={index} />;
                                                    })
                                                }
                                              />


                                                <Box display="flex" alignItems="center" >
                                                  <Typography variant="h6" sx={{mb: 2, mr: 1}}>
                                                    {`Rating:`}
                                                  </Typography>
                                                  <Rating value={editedRating} onChange={(event, newValue) => {
                                                    setEditedRating(newValue as number);
                                                  } } sx={{mb: 2}}/>
                                                </Box>
                                              
                                                <TextField
                                                  multiline
                                                  id="description"
                                                  label="Description"
                                                  value={editedDescription}
                                                  onChange={(e) => setEditedDescription(e.target.value)}
                                                  fullWidth
                                                  variant="outlined"
                                                  sx={{mb: 2}}
                                                />

                                                <Autocomplete
                                                  id="combo-box-demo"
                                                  options={AllCategories}
                                                  value={editedCategory}
                                                  freeSolo
                                                  onInputChange={(event, newInputValue) => {
                                                    setEditedCategory(newInputValue);
                                                  }}
                                                  renderInput={(params) => <TextField {...params} label="Category" fullWidth variant="outlined" sx={{mb: 2}}/>}
                                                />

                                                <Autocomplete
                                                  id="publishers"
                                                  options={AllPublishers}
                                                  value={editedPublisher}
                                                  onInputChange={(event, newInputValue) => {
                                                    setEditedPublisher(newInputValue);
                                                  }}
                                                  renderInput={(params) => <TextField {...params} label="Publishers" fullWidth variant="outlined" sx={{mb: 2}}/>}
                                                />

                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="Page Count"
                                                    variant="outlined"
                                                    type="number"
                                                    value={editedPageCount}
                                                    InputProps={{ inputProps: { min: 0 } }}
                                                    sx={{mb:2}}
                                                    onChange={(e) =>  setEditedPageCount(Number(e.target.value))}
                                                />

                                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                                    <DemoItem sx={{ mb:2 }}>
                                                        <DatePicker 
                                                            value={editedPublishedDate ? dayjs(editedPublishedDate) : null} 
                                                            onChange={(newDate) => {
                                                                if (newDate) {
                                                                    setEditedPublishedDate(newDate.toDate());
                                                                }
                                                            }}
                                                        />
                                                    </DemoItem>
                                                </LocalizationProvider>

                                                <FormControl fullWidth sx={{ mb:2 }}>
                                                    <InputLabel id="isfeatured-select-label">Is Featured Book</InputLabel>
                                                    <Select
                                                        labelId="isfeatured-select-label"
                                                        id="isfeatured-select"
                                                        value={editedisFeaturedBook ? 'true' : 'false'}
                                                        label="Is Featured Book"
                                                        onChange={(e) => setIsEditedFeaturedBook(e.target.value === 'true' ? true : false)}
                                                    >
                                                        <MenuItem value="true">True</MenuItem>
                                                        <MenuItem value="false">False</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <FormControl fullWidth sx={{ mb:2 }}>
                                                  <InputLabel id="availability-select-label">Availability</InputLabel>
                                                  <Select
                                                    labelId="availability-select-label"
                                                    id="availability-select"
                                                    value={editedavailability ? 'true' : 'false'}
                                                    label="Availability"
                                                    onChange={(e) =>  setEditedAvailability(e.target.value === 'true' ? true : false)}
                                                  >
                                                    <MenuItem value="true">True</MenuItem>
                                                    <MenuItem value="false">False</MenuItem>
                                                  </Select>
                                                </FormControl>

                                                <Button variant='contained' sx={{mb:2, mr:2}}>
                                                    Update Book
                                                </Button>
                                                <Button variant='outlined' sx={{mb:2}} onClick={()=>{setIsEditing(false)}}>
                                                    Cancel
                                                </Button>
                                            </>
                                            :
                                            <>
                                            <Typography variant="h6" sx={{mb:1, color: theme.palette.text.secondary}} >
                                                {authors.join(', ')}
                                            </Typography>
                                            <Typography variant="body1" sx={{mb:1}}>
                                                <Rating value={rating} readOnly/>
                                            </Typography>
                                            <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                            <span>
                                                <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                                Genere: {" "}
                                                </Typography> 
                                                {category}
                                            </span>
                                            </Typography>
                                            <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                            <span>
                                                <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                                Page count: {" "}
                                                </Typography>
                                                {pageCount === 0 ? 'Not Available' : pageCount}
                                            </span>
                                            </Typography>

                                            <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                            <span>
                                                <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                                Publisher: {" "}
                                                </Typography>
                                                {publisher}
                                            </span>
                                            </Typography>

                                            <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                            <span>
                                                <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                                Published Date: {" "}
                                                </Typography>
                                                {publishedDate ? new Date(book.publishedDate).toLocaleDateString() : 'Not Available'}
                                            </span>
                                            </Typography>

                                            <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                            <span>
                                                <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                                Book Description: {" "}
                                                </Typography>
                                                {description}
                                            </span>
                                            </Typography>

                                            <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                            <span>
                                                <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                                Availability: {" "}
                                                </Typography>
                                                {availability ? 'Yes, Available for checkout' : 'No, currently unavailable for checkout'}
                                            </span>
                                            </Typography>

                                            <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                            <span>
                                                <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                                    Featured Book: {" "}
                                                </Typography>
                                                {isFeaturedBook ? 'Yes, Featured Book' : 'No, currently not featured book'}
                                            </span>
                                            </Typography>
                                            
                                            <Box sx={{display: 'flex', flexDirection: 'row', gap: 1 , alignItems: 'center'}}>
                                                <Button variant='outlined' sx={{mb:2}} onClick={()=>{setViewRentalHistory(true)}}>
                                                    View Rental History
                                                </Button>
                                                <Button variant='outlined' sx={{mb:2}} onClick={()=>{setViewFavouritedBy(true)}}>
                                                    View Favourited By
                                                </Button>
                                            </Box>
                                            </>
                                    }
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Typography variant="h5" sx={{mb:1, color: theme.palette.primary.main}}>
                                    Reader Reviews: 
                                </Typography>
                                <EmblaCarousel slides={book?.reviews || []} options={OPTIONS} />
                            </Grid>

                        </Grid>
                        :
                         <Grid container>
                         <Grid item xs={12} sm={4}>
                           <Skeleton variant="rectangular" width={350} height={450} sx={{mb:2}} animation="wave" />
                         </Grid>
                         <Grid item xs={12} sm={8}>
                           <Skeleton variant="text" sx={{mb:1}} animation="wave" />
                           <Skeleton variant="text" sx={{mb:1}} animation="wave" />
                           <Skeleton variant="text" sx={{mb:1}} animation="wave" />
                           <Skeleton variant="text" sx={{mb:1}} animation="wave" />
                           <Skeleton variant="text" sx={{mb:1}} animation="wave" />
                           <Skeleton variant="text" sx={{mb:1}} animation="wave" />
                           <Skeleton variant="text" sx={{mb:1}} animation="wave" />
                           <Skeleton variant="text" sx={{mb:1}} animation="wave"  />
                           <Skeleton variant="rectangular" width={100} height={40} sx={{mb:2}} animation="wave"/>
                           <Skeleton variant="rectangular" width={100} height={40} sx={{mb:2}} animation="wave"/>
                         </Grid>
                         <Grid item xs={12} sm={12}>
                           <Skeleton variant="text" sx={{mb:1}}  animation="wave" />
                           <Skeleton variant="rectangular" width="74rem" height="13rem"  animation="wave" />
                         </Grid>
                        </Grid>
                        }
                    </Paper>
                     
                </Box>
                <Snackbar open={Alertopen} autoHideDuration={3000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity={alert?.severity} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
              </Box>
              
            {book && <ChatboxComponent book={book} role={"librarian"} informationFromLibrarian={onRentalHistory() + " " + onFavoriteBy()}/>}
            {
                viewRentalHistory && book && <DialogComponentForHistory book={book} openDialog={viewRentalHistory} setOpenDialog={setViewRentalHistory} currentCase="RentalHistory"/>
            }
            {
                viewFavouritedBy && book && <DialogComponentForHistory book={book} openDialog={viewFavouritedBy} setOpenDialog={setViewFavouritedBy} currentCase="FavouritedBy"/>
            }
        </Box>
        </ThemeProvider>
    )
}