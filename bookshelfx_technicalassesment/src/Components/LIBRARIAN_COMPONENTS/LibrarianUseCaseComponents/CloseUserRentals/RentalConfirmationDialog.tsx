import React from "react";
import theme from "@/Components/Themes";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, ThemeProvider, Typography } from "@mui/material";

export default function RentalConfirmationDialog({openDialog, setOpenDialog, handleCloseRental}:{
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    handleCloseRental: () => void
}) 
{    
    const [confirmationText, setConfirmationText] = React.useState<string>('');
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
                    {"Closing a rental book"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant= "body1" sx={{
                            mb:1, 
                            color: theme.palette.text.secondary,
                        }}>
                             
                             { 'Please confirm you return of this book by typing the below text'}
     
                        </Typography>
                        <Typography variant='body1' sx={{
                            mb:1,
                            color: theme.palette.primary.main,
                        }}>
                             
                             
                             {`"CLOSERENTAL"`}
                       
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                        onClick={() => {handleCloseRental(); setConfirmationText(''); handleClose()}}
                        autoFocus 
                        disabled={confirmationText !== "CLOSERENTAL"}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
