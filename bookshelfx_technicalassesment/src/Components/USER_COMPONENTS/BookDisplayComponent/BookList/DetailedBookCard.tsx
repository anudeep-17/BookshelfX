import * as React from 'react';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Badge, Box, Button, ThemeProvider, Tooltip } from '@mui/material';
import theme from '../../../Themes';
import { BookCardProps } from '../../../interfaceModels';
import bookcover from '@/assets/bookcover.png';
import Cookies from 'js-cookie';
import { isbookrentedByUserPreviously, isbookrentedbycurrentuser, isuserReturnInitiated, setAvailabilityofBook } from '@/Services/BookRoutines';
import RentalConfirmationDialog from '@/Components/USER_COMPONENTS/RentalConfirmationDialog';


export default function DetailedBookCard({bookID, coverimage, title, description, rating, authors, availability, onClick, setAlert,setAlertOpen }: BookCardProps 
                                        & { 
                                            setAlert: React.Dispatch<React.SetStateAction<{severity: 'success' | 'error', message: string}>>,
                                            setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
                                        })
{

    const [value, setValue] = React.useState<number | null>(rating || null);
    const [isBookRented, setIsBookRented] = React.useState<boolean>(availability ? false : true);
    const [isRentedBytheSameUser, setIsRentedBytheSameUser] = React.useState<boolean>(false);   
    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);
    const [IsuserReturnInitiated, setIsuserReturnInitiated] = React.useState<boolean>(false);
    const [BookIsPreviouslyRented, setBookIsPreviouslyRented] = React.useState<boolean>(false);

    let userID: number | null = null;
    const userCookie = Cookies.get('user');
    if (userCookie !== undefined) {
        userID = Number(JSON.parse(userCookie).id);
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const response =  await isbookrentedbycurrentuser(bookID || 0, userID || 0);  
            setIsRentedBytheSameUser(response.success);
        }
        fetchData();
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await isuserReturnInitiated(bookID || 0);
            setIsuserReturnInitiated(response.success);
        }
        fetchData();
    },[])

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await isbookrentedByUserPreviously(bookID || 0, userID || 0);
            setBookIsPreviouslyRented(response.success);
        }
        fetchData();
    },[])

    const handleClickonCheckout = async () => {
        const result = await setAvailabilityofBook(Number(bookID), false, Number(userID));
        if(result.success)
        {
            setAlert({severity: "success", message: "Book checked out successfully"});
            setAlertOpen(true);
            setIsBookRented(true);
            setIsRentedBytheSameUser(true);
        }
        else
        {
            setAlert({severity: "error", message: "Failed to checkout book"});
            setAlertOpen(true);
        }
    }

    const handleClickonReturn = async () => {
        const result = await setAvailabilityofBook(Number(bookID), true, Number(userID));
        if(result.success)
        {
            setAlert({severity: "success", message: "Book returned successfully"});
            setAlertOpen(true);
            setIsBookRented(false);
            setIsRentedBytheSameUser(false);
        }
        else
        {
            setAlert({severity: "error", message: "Failed to return book"});
            setAlertOpen(true);
        }
    }

    return(
        <ThemeProvider theme={theme}>
            <Tooltip title={isRentedBytheSameUser ? (IsuserReturnInitiated ? "Return Under Review" : "Already Rented") : (!availability ? "Not Available" : null)} followCursor>
                <Box sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: {xs:'35%', sm:'30%'}, // Increased size
                        maxWidth: {xs:'100%', sm:'30%'}, // Increased size
                        minHeight: 600, // Increased size
                        maxHeight: 600, // Increased size
                        transition: '0.5s', // Add transition for smooth elevation
                        ':hover': {
                            transform: 'translateY(-8px)', // Elevate the card on hover
                            boxShadow: '0 3px 10px #3f51b5',
                            cursor: 'pointer',
                            
                        },
                        backgroundColor: !isBookRented ? 'initial' : '#cccccc',
                        borderRadius: '10px 10px 10px 10px', // Make top borders curved
                    }}
                    onClick={onClick}
                    >
    
                        <Box sx={{ 
                            height: 400, // Increased size
                            backgroundImage: `url(${coverimage === 'N/A'? bookcover.src : coverimage})`, // Add image
                            backgroundSize: 'cover', // Add this to fit the image
                            backgroundPosition: 'center', // Add this to center the image
                            borderRadius: '10px 10px 0 0', // Make top borders curved
                            borderTop: '0.05px solid rgb(169, 169, 169)', // Add border to the top
                            borderLeft: '0.05px solid rgb(169, 169, 169)', // Add border to the left
                            borderRight: '0.05px solid rgb(169, 169, 169)', // Add border to the right
                        }}/> 
            
                    
                        <Box sx={{ 
                            padding: 2, // Add some padding
                            boxShadow: '0 0.9px 0.8px 0.2px rgba(0, 0, 0, .3)', // Reduced shadow to create less elevation effect
                            borderRadius: '0 0 10px 10px',
                        }}>
                            <Typography variant="h6" component="div">
                                {title.length > 30 ? `${title.substring(0, 30)}...` : title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{
                                mb:0.5
                            }}>
                                {authors.join(", ")}
                            </Typography>
                            
                            <Rating name="read-only" value={value} readOnly sx={{
                                mb:1
                            }}/>
                            
                            <Typography variant="body2" color="text.secondary" sx={{
                                minHeight: '80px',
                                textAlign: 'justify',
                                mb:0.5
                            }}>
                                {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mt: 1, 
                                    mb:1
                                }}
                            >
                                <Button variant="contained" color="primary"  
                                        disabled={isBookRented && (!isRentedBytheSameUser || (isRentedBytheSameUser && IsuserReturnInitiated))}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setOpenConfirmationDialog(true);
                                        }}>
                                    {isRentedBytheSameUser ? (IsuserReturnInitiated ? "Book Return Under Review" : "Return Book") : "Checkout"}
                                </Button>
                                {
                                    BookIsPreviouslyRented && !isRentedBytheSameUser && !IsuserReturnInitiated && 
                                    <Button variant='outlined'>
                                        Leave a Review
                                    </Button>
                                }
                            </Box>
                            
                        </Box>
        
                    </Box>
                </Tooltip>
                    {
                        openConfirmationDialog &&
                        <RentalConfirmationDialog 
                            openDialog={openConfirmationDialog} setOpenDialog={setOpenConfirmationDialog} 
                            task={isRentedBytheSameUser ? 'returning' : 'renting'} 
                            handleCheckout={handleClickonCheckout}
                            handleReturn={handleClickonReturn}
                        />
                    }
        </ThemeProvider>
    );
}
 