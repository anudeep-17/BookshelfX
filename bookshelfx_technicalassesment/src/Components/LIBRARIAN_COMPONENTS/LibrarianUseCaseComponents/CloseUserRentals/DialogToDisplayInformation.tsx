import { BookRentalDetails } from "@/Components/interfaceModels";
import React from "react";
import theme from "@/Components/Themes";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, TextField, ThemeProvider, Typography } from "@mui/material";


export default function DialogToDisplayInformation(
    {OpenDialog, setOpenDialog, DetailsAbout, bookRentalDetails}:
    {
        OpenDialog: boolean,
        setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
        DetailsAbout: string | null,
        bookRentalDetails: BookRentalDetails | null
    }
)
{
    const handleClose = () => {
        setOpenDialog(false);
    };

    return(
        <ThemeProvider theme={theme}>
            <Dialog
                open={OpenDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            > 
                <DialogTitle id="alert-dialog-title">
                    {DetailsAbout === 'book'? "Book Details" : "User Details"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            DetailsAbout === 'book'?
                            <>
                                <Typography variant="h2" sx={{mb:2}}>Title: {bookRentalDetails?.book.title}</Typography>
                                <Typography variant="h5" sx={{color: theme.palette.text.secondary, mb:2}} >
                                    Author:{" "}
                                    <span style={{ color: theme.palette.text.primary }}>
                                       {bookRentalDetails?.book.authors.join(", ")}
                                    </span>
                                </Typography>
                                <Typography variant="body1" color={theme.palette.text.secondary } sx={{mb:2}} >
                                    Description: {" "}
                                    <span style={{ color: theme.palette.text.primary }}>
                                         {bookRentalDetails?.book.description}
                                    </span>
                                </Typography>
                                 <Rating name="read-only" value={bookRentalDetails?.book.rating} readOnly sx={{mb:2}}/>
                            </>:
                            <>
                                <Typography variant="body1">Name: {bookRentalDetails?.user?.name}</Typography>
                                <Typography variant="body1">Email: {bookRentalDetails?.user?.email}</Typography>
                            </>
                        }
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}