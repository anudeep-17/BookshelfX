import React from "react";
import theme from "@/Components/Themes";
import {   Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  TextField, ThemeProvider, Typography } from "@mui/material";
 

export default function  DeleteDialog({openDialog, setOpenDialog, handleDeleteAccount }:{
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    handleDeleteAccount: () => void
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
                    {"Delete Account"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant= "body1" sx={{
                            mb:1, 
                            color: theme.palette.text.secondary,
                        }}>
                            Are you sure you want to delete your account? This action is irreversible.
                        </Typography>
                        <Typography variant='body1' sx={{
                            mb:1,
                            color: theme.palette.primary.main,
                        }}>
                             
                             "DELETEACCOUNT" 
                       
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
                    <Button onClick={() => {handleDeleteAccount(); setConfirmationText(''); handleClose()}} autoFocus disabled={ confirmationText !== "DELETEACCOUNT" }>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}
