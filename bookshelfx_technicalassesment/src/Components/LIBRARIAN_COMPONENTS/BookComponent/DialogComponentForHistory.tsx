import React from "react";
import theme from "@/Components/Themes";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, ThemeProvider, Typography } from "@mui/material";
import { BookDetails } from "@/Components/interfaceModels";
import { Accordion, AccordionSummary, AccordionDetails  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function  DialogComponentForHistory({book, openDialog, setOpenDialog, currentCase}:{
    book: BookDetails,
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    currentCase: string
}) 
{
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
                                        <Typography variant="body1">Rented By User: {rental.userId}</Typography>
                                        <Typography variant="body1">Rental Date: {new Date(rental.rentalDate).toLocaleString()}</Typography>
                                        <Typography variant="body1">Return Date: {new Date(rental.returnDate).toLocaleString()}</Typography>
                                        <Typography variant="body1">Returned: {rental.returned ? 'Yes' : 'No'}</Typography>
                                        <Typography variant="body1">Is Overdue: {rental.isOverdue ? 'Yes' : 'No'}</Typography>
                                        <Typography variant="body1">Rental Closed by Librarian: {rental.librarianId}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                            :
                            book.favoritedBy?.map((favorite, index) => (
                                <Typography key={index} variant="body1" sx={{
                                    color: theme.palette.primary.main
                                }}>User ID: {favorite.userId}</Typography>
                            ))
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
