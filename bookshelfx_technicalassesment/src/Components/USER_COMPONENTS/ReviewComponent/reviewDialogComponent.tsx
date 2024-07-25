import React from "react";
import theme from "@/Components/Themes";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, TextField, ThemeProvider, Typography } from "@mui/material";
import { BookReview } from "@/Components/interfaceModels";

export default function ReviewConfirmationDialog({openDialog, setOpenDialog, task, handleLeaveReview, Userreview}:{
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<{ open: boolean, task: string }>>,
    task: string,
    handleLeaveReview: (rating: number, review: string) => void,
    Userreview?: BookReview
}) 
{    
    const [isEditing, setIsEditing] = React.useState<boolean>(false);

    const[rating, setRating] = React.useState<number | null>(0);
    const[review, setReview] = React.useState<string>('');

    const handleClose = () => {
        setOpenDialog({open: false, task: ""})
    };
    
    React.useEffect(() => {
        if(Userreview && task === 'viewing' && Userreview.bookId !== 0 && Userreview.userId !== 0)
        {
            setRating(Userreview.rating);
            setReview(Userreview.review);
        }
    }, []);

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
                    {task === 'reviewing' ? "Leave a review for the book":"View your review for the book"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       
                                <Typography variant= "h6" sx={{
                                    mb:1, 
                                    color: theme.palette.primary.main,
                                }}>
                                    
                                        {task === 'reviewing' ? "Hope you enjoyed reading the book, please leave a review":"You have already left a review for the book"}
            
                                </Typography>
                                {
                                    task === 'reviewing' ?
                                    <>
                                        <Box sx={{ mb: 1, color: theme.palette.text.secondary, display: 'flex', flexDirection:'row', alignItems: 'center', gap:1 }}>
                                            <Typography variant="body1">
                                                Rate the book:  
                                            </Typography>
                                            <Rating value={rating} onChange={(e, newValue) => { setRating(newValue); }} />
                                        </Box>
                                        
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Review"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            multiline
                                            rows={4}
                                            value = {review}
                                            placeholder="Write your review here..."
                                            onChange={(e) => { setReview(e.target.value); }}
                                        />
                                    </>
                                    :
                                    <>
                                        <Box sx={{ mb: 1, color: theme.palette.text.secondary, display: 'flex', flexDirection:'row', alignItems: 'center', gap:1 }}>
                                            <Typography variant="body1">
                                               Your rating: 
                                            </Typography>
                                            <Rating value={rating} readOnly={!isEditing} onChange={(e, newValue)=>{
                                                if(isEditing)
                                                {
                                                    setRating(newValue);
                                                }
                                            }} />
                                        </Box>

                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Review"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            multiline
                                            rows={4}
                                            value={review}
                                            onChange={(e) => { if(isEditing) { setReview(e.target.value); }}}
                                            InputProps={{
                                                readOnly: !isEditing,
                                            }}
                                        />

                                    </>
                                }
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {
                        task === 'reviewing' ?   
                        <Button 
                            autoFocus 
                            disabled = {review === ''}
                            onClick={() => {
                                handleLeaveReview(rating!, review);
                                handleClose();
                            }}
                        >
                        Submit Review
                        </Button>
                        :
                        null
                    }
                  
                    {
                        task === 'viewing' ? 
                        isEditing ?
                        <Button 
                            autoFocus 
                            onClick={() => {
                                handleLeaveReview(rating!, review);
                                handleClose();
                            }}
                        >
                            Submit New Review
                        </Button>
                        : 
                        <Button 
                            variant="contained"
                            autoFocus 
                            disabled = {review === ''}
                            onClick={() => {
                                setIsEditing(true);
                            }}
                        >
                            Edit Review
                        </Button>
                        :
                        null
                    }

                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
