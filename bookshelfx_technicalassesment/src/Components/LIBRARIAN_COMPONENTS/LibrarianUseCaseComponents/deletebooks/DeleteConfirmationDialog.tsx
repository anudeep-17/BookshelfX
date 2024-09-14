import React from "react";
import theme from "@/Components/Themes";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, ThemeProvider, Typography } from "@mui/material";
import { BookDetails } from "@/Components/interfaceModels";

export default function DeleteConfirmationDialog({book, openDialog, setOpenDialog, handleDeleteBook}:{
    book: BookDetails,
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    handleDeleteBook: (book:BookDetails) => void
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
                    {"Removing Book(S) From Shelf"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant= "body1" sx={{
                            mb:1, 
                            color: theme.palette.text.secondary,
                        }}>
                             
                            {'Please confirm you want to remove the book by typing the below text'}
     
                        </Typography>
                        <Typography variant='body1' sx={{
                            mb:1,
                            color: theme.palette.primary.main,
                        }}>
                             
                             {"DELETEBOOK" }
                       
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
                    <Button onClick={() => {handleDeleteBook(book);setConfirmationText(''); handleClose()}} autoFocus disabled={ confirmationText !== "DELETEBOOK" }>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
