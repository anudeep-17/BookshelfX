'use Client';
import React from 'react';
import { Box, Button, CssBaseline, Grid, Paper, Rating, Skeleton, ThemeProvider, Toolbar, Tooltip, Typography } from '@mui/material';
import theme from '../../Themes';
import { Book } from '../../interfaceModels';
import { getBookByID, setAvailabilityofBook } from '@/Services/BookRoutines';
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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addFavBooks, removeFavBooks} from '@/Services/BookRoutines';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import ChatboxComponent from '@/Components/ChatBox/ChatboxComponent';
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import bookcover from '@/assets/bookcover.png'
import { BookDetails } from '../../interfaceModels';
import RentalConfirmationDialog from './RentalConfirmationDialog';

const drawerWidth = DashboardSize;
const OPTIONS: EmblaOptionsType = { loop: true }

export default function WholeBookData({id}:{id: string})
{
    const pathname = usePathname();
    const [book, setBook] = React.useState<BookDetails>();
    const [isFav, setIsFav] = React.useState(false);
    const [confetti, setConfetti] = React.useState(false);
    const [isBookRented, setIsBookRented] = React.useState(false);
    const [isBookRentedByCurrentUser, setIsBookRentedByCurrentUser] = React.useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);
    const [CurrentRentalStatus, setCurrentRentalStatus] = React.useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getBookByID(id);
            if (data.success) {
                console.log(data.data);
                setBook(data.data)
                if(!data.data.availability)
                {
                    setIsBookRented(true);
                }
                if(data.data.rentals.length > 0)
                {
                    const user = Cookies.get('user');
                    const userID = user ? JSON.parse(user).id.toString() : '';
                    console.log(data.data.rentals[0].userId ===  Number(userID) && !data.data.rentals[0].returned);
                    if (data.data.rentals[0].userId ===  Number(userID) && !data.data.rentals[0].returned) {
                        console.log('Book is rented by current user');
                        setIsBookRentedByCurrentUser(true);
                      } else {
                        setIsBookRentedByCurrentUser(false);
                      }
                }
                if(data.data.favoritedBy.length > 0)
                {
                    const user = Cookies.get('user');
                    const userID = user ? JSON.parse(user).id.toString() : '';
                    const userFav = data.data.favoritedBy.find((fav:{userId:number, bookId: number}) => fav.userId === Number(userID));
                    if(userFav)
                    {
                        setIsFav(true);
                    }
                }
            }
        };
        const timeoutId = setTimeout(fetchData, 1000); 
    
        return () => clearTimeout(timeoutId);  
    }, [id]);

    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState<{severity: 'success' | 'error', message: string}>({severity: 'success', message: ""});
    const [Alertopen, setAlertOpen] = React.useState(false);    

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
        
    const handleAddToFav = async () => {
        if(book)
        {
            const user = Cookies.get('user');
            const userID = user ? JSON.parse(user).id.toString() : '';
            const response = await addFavBooks(Number(userID) ?? '', Number(book?.id?.toString()) ?? '');
            if(response.success)
            {
                setAlert({severity: "success", message: "Book added to your favourite list"});
                setAlertOpen(true);
            }
            else
            {
                setAlert({severity: "error", message: "Failed to add book to your favourite list"});
                setAlertOpen(true);
            }
        }
        else
        {
            setAlert({severity: "error", message: "Failed to add book to your favourite list"});
            setAlertOpen(true);
        }
    }

    const handleRemoveFromFav = async () => {
        if(book)
        {
            const user = Cookies.get('user');
            const userID = user ? JSON.parse(user).id.toString() : '';
            const response = await removeFavBooks(Number(userID) ?? '', Number(book?.id?.toString()) ?? '');
            if(response.success)
            {
                setAlert({severity: "success", message: "Book removed from your favourite list"});
                setAlertOpen(true);
            }
            else
            {
                setAlert({severity: "error", message: "Failed to remove book from your favourite list"});
                setAlertOpen(true);
            }
        }
        else
        {
            setAlert({severity: "error", message: "Failed to remove book from your favourite list"});
            setAlertOpen(true);
        }
    }

    const handleFavClick = () => 
    {
        if(isFav)
        {
            handleRemoveFromFav();
            setIsFav(false);
        }
        else
        {
            handleAddToFav();
            setIsFav(true);
        }
    }

    const handleClickonCheckout = async () => {
        setConfetti(true);
        const user = Cookies.get('user');
        const userID = user ? JSON.parse(user).id.toString() : '';
        const Bookid = pathname.split('/')[3];
        const result = await setAvailabilityofBook(Number(Bookid), false, Number(userID));
        if(result.success)
        {
            setAlert({severity: "success", message: "Book checked out successfully"});
            setAlertOpen(true);
            setIsBookRented(true);
            setIsBookRentedByCurrentUser(true);
        }
        else
        {
            console.log(result);
            setAlert({severity: "error", message: "Failed to checkout book"});
            setAlertOpen(true);
        }
    }

    const handleClickonReturn = async () => {
        const user = Cookies.get('user');
        const userID = user ? JSON.parse(user).id.toString() : '';
        const Bookid = pathname.split('/')[3];
        const result = await setAvailabilityofBook(Number(Bookid), true, Number(userID));
        if(result.success)
        {
            setAlert({severity: "success", message: "Book returned successfully"});
            setAlertOpen(true);
            setIsBookRented(false); 
            setIsBookRentedByCurrentUser(false);
        }
        else
        {
            setAlert({severity: "error", message: "Failed to return book"});
            setAlertOpen(true);
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
                                        <IconButton sx={{mb: 1, mr:1}} onClick={handleFavClick}>
                                            <Tooltip title="Add to Wishlist">
                                                {
                                                    isFav ? 
                                                    <FavoriteIcon sx={{color: theme.palette.primary.main,}} /> 
                                                    : 
                                                    <FavoriteBorderIcon sx={{color: theme.palette.primary.main,}}/>
                                                } 
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
                                <Typography variant="h6" sx={{mb:1, color: theme.palette.text.secondary}} >
                                    {book?.authors.join(', ')}
                                </Typography>
                                <Typography variant="body1" sx={{mb:1}}>
                                    <Rating value={book?.rating} readOnly/>
                                </Typography>
                                <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                <span>
                                    <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                    Genere: {" "}
                                    </Typography> 
                                    {book?.category}
                                </span>
                                </Typography>
                                <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                <span>
                                    <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                    Page count: {" "}
                                    </Typography>
                                    {book?.pagecount === 0 ? 'Not Available' : book?.pagecount}
                                </span>
                                </Typography>

                                <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                <span>
                                    <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                    Publisher: {" "}
                                    </Typography>
                                    {book?.publisher}
                                </span>
                                </Typography>

                                <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                <span>
                                    <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                    Published Date: {" "}
                                    </Typography>
                                    {book?.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : 'Not Available'}
                                </span>
                                </Typography>

                                <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                <span>
                                    <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                    Book Description: {" "}
                                    </Typography>
                                    {book?.description}
                                </span>
                                </Typography>

                                <Typography variant="body1" sx={{mb:1, color: theme.palette.text.primary}}>
                                <span>
                                    <Typography component="span" sx={{color: theme.palette.primary.main}} noWrap>
                                    Availability: {" "}
                                    </Typography>
                                    {book?.availability ? 'Yes, Available for checkout' : 'No, currently unavailable for checkout'}
                                </span>
                                </Typography>
                                {
                                    isBookRented && confetti && <Fireworks autorun={{ speed: 1, duration: 1000}}/>
                                }
                                {
                                    isBookRented?
                                    (isBookRentedByCurrentUser ?
                                    <Button variant="contained" color="primary" sx={{mb:1, mt:1}} onClick={()=>{setOpenConfirmationDialog(true); setCurrentRentalStatus('returning')}}>
                                        Return The Book
                                    </Button>
                                    :
                                    <Button variant="contained" color="primary" sx={{mb:1, mt:1}} disabled>
                                        Book Not Available
                                    </Button>)
                                    :
                                    <Button variant="outlined" color="primary" sx={{mb:1, mt:1}} onClick={()=>{setOpenConfirmationDialog(true); setCurrentRentalStatus('renting')}}>
                                        Checkout Book
                                    </Button>
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
              
            {book && <ChatboxComponent book={book}/>}

            {
                openConfirmationDialog &&
                <RentalConfirmationDialog 
                openDialog={openConfirmationDialog} setOpenDialog={setOpenConfirmationDialog} 
                task={CurrentRentalStatus} 
                handleCheckout={handleClickonCheckout}
                handleReturn={handleClickonReturn}
                />
            }
                        
        </Box>
        </ThemeProvider>
    )
}