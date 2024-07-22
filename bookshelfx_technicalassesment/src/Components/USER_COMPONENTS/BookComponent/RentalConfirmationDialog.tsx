import React from "react";
import theme from "@/Components/Themes";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, ThemeProvider, Typography } from "@mui/material";

export default function RentalConfirmationDialog({openDialog, setOpenDialog, task, handleCheckout, handleReturn}:{
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    task: string,
    handleCheckout: ()=> void,
    handleReturn: ()=> void,
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
                    {task === 'renting' ? "Renting Book confirmtaion":"Returning a rental book"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant= "body1" sx={{
                            mb:1, 
                            color: theme.palette.text.secondary,
                        }}>
                             
                             {task === 'renting' ? 'Please confirm you want to rent this book by typing the below text' : 'Please confirm you want to return this book by typing the below text'}
     
                        </Typography>
                        <Typography variant='body1' sx={{
                            mb:1,
                            color: theme.palette.primary.main,
                        }}>
                             
                             
                             {task === 'renting' ? `"RENTBOOK"` :`"RETURNBOOK"`}
                       
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
                        onClick={() => {(task === 'renting'? handleCheckout() : handleReturn()); setConfirmationText(''); handleClose()}}
                        autoFocus 
                        disabled={task === 'renting' ? confirmationText !== "RENTBOOK" : confirmationText !== "RETURNBOOK"}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
