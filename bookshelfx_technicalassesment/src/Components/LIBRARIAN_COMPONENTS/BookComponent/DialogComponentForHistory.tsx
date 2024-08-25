import React from "react";
import theme from "@/Components/Themes";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { BookDetails } from "@/Components/interfaceModels";
import { Accordion, AccordionSummary, AccordionDetails  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


export default function  DialogComponentForHistory({book, openDialog, setOpenDialog, currentCase}:{
    book: BookDetails,
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    currentCase: string
}) 
{
    const [showDetails, setShowDetails] = React.useState(false);
    const handleClick = () => {
        setShowDetails(!showDetails);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    return(
        <ThemeProvider theme={theme}>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {currentCase === 'RentalHistory'? "Rental History" : "Book is favourited by"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant= "body1" sx={{
                            mb:1, 
                            color: theme.palette.text.secondary,
                        }}>
                           {currentCase === 'RentalHistory' ? 
                                <>Total Rentals of the book: <span style={{color: theme.palette.primary.main}}>{book.rentals.length}</span></> 
                                : 
                                <>Book is favourited by: <span style={{color: theme.palette.primary.main}}>{book.favoritedBy?.length}</span> users</>
                            }
                        </Typography>
                        {
                            currentCase === 'RentalHistory'?
                             book.rentals.length > 0? 
                                book.rentals.map((rental, index) => (
                                    <Accordion key={index} defaultExpanded={index === 0} sx={{
                                        mb: 1
                                    }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${index}-content`}
                                            id={`panel${index}-header`}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: theme.palette.primary.main
                                                }}
                                            >Rental: {index + 1}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="body1">Rental ID: {rental.id}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClick}>
                                                <Typography variant="body1">
                                                    Rented By User: {rental.userId}
                                                </Typography>
                                                {showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </Box>

                                            {showDetails && (
                                                <Box sx={{
                                                    ml: 2, 
                                                    mr: 2,
                                                    mb: 1,
                                                    mt:1
                                                }}>
                                                    <Paper elevation={3} sx={{p:1}}>
                                                        <Typography variant="body2" sx={{mb:1, color: theme.palette.primary.main}}>User Email: {rental.user?.email} </Typography>
                                                        <Typography variant="body2" sx={{color: theme.palette.primary.main}}>User Name: {rental.user?.name}</Typography>
                                                    </Paper>
                                                </Box>
                                            )}
                                            <Typography variant="body1">Rental Date: {new Date(rental.rentalDate).toLocaleString()}</Typography>
                                            <Typography variant="body1">Expected Return Date: {new Date(rental.expectedReturnDate).toLocaleString()}</Typography>
                                            {
                                                rental.returned && 
                                                <>
                                                    <Typography variant="body1">Returned Date: {rental.returnDate ? new Date(rental.returnDate).toLocaleString() : "N/A"}</Typography>
                                                    <Typography variant="body1">User Initiated Return: {rental.userInitiatedReturn ? 'Yes' : 'No'}</Typography>
                                                </>
                                            }
                                            <Typography variant="body1">Returned: {rental.returned ? 'Yes' : 'No'}</Typography>
                                            <Typography variant="body1">Is Overdue: {rental.isOverdue ? 'Yes' : 'No'}</Typography>
                                            {
                                                rental.returned && 
                                                <Typography variant="body1">Rental Closed by Librarian: {rental.librarianId}</Typography>
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                )):
                                <Typography variant="body1" sx={{
                                    color: theme.palette.primary.main
                                }}>No Rentals found for this book</Typography>
                            :
                            book.favoritedBy?.length !== 0 ? book.favoritedBy?.map((favorite, index) => (
                                <Typography key={index} variant="body1" sx={{
                                    color: theme.palette.primary.main
                                }}>User ID: {favorite.userId}</Typography>
                            )):
                            <Typography variant="body1" sx={{
                                color: theme.palette.primary.main
                            }}>No users have favourited this book</Typography>
                        }
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
