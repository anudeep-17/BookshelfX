import React from "react";
import { BookDetails } from "@/Components/interfaceModels";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Rating, TextField, ThemeProvider, Typography } from "@mui/material";
import theme from "@/Components/Themes";
import Image from "next/image";
import bookcover from '@/assets/bookcover.png'

export default function BookDisplayDialog({open, handleClose, book, setAlertOpen, setAlertContent}: 
    {
        open: boolean, 
        book: BookDetails,
        handleClose: () => void,
        setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
        setAlertContent: React.Dispatch<React.SetStateAction<{severity: "success" | "error" | "info" | "warning" | undefined; message: string;}>>
    }) 
{
    const [showConfirmationDialog, setshowConfirmationDialog] = React.useState<{open: boolean, task: string}>({open: false, task: ""});
    const [confirmationText, setConfirmationText] = React.useState('' as string);

    const BookInformationTypography = () => 
    {

      return(
        <>
          <Typography variant="h6" sx={{mb: 2}}>{`Author(s): ${book.authors.join(", ")}`}</Typography>
          <Rating name="read-only" value={book.rating} readOnly  sx={{mb:2}}/>
          <Typography variant="body1" sx={{mb: 2}}>{`Description: ${book.description}`}</Typography>
          <Typography variant="body1" sx={{mb: 2}}>{`Category: ${book.category}`}</Typography>
          <Typography variant="body1" sx={{mb: 2}}>{`Publisher: ${book.publisher}`}</Typography>
          <Typography variant="body1" sx={{mb: 2}}>{`Page Count: ${book.pagecount}`}</Typography>
          <Typography variant="body1" sx={{mb: 2}}>
            {`Published Date: ${book.publishedDate}`}
          </Typography>
          <Typography variant="body1" sx={{mb: 2}}>{`Is Featured: ${book.isFeaturedBook}` }</Typography>
          <Typography variant="body1" sx={{mb: 2}}>{`Is Available: ${book.availability}`}</Typography>
        </>
      )
    }

    return(
        <React.Fragment>
        <ThemeProvider theme={theme}>
          <Dialog
            fullWidth={true}
            maxWidth='lg'
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
              },
            }}
          >
                <DialogTitle sx={{width: '100%'}}>
                    {"Check the book details before deleting to shelf"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={2} sx={{
                          color: theme.palette.text.primary,
                        }}>
                            <Grid item xs={12} sm={4}>  
                                <Image src={book.coverimage !=='N/A'? book.coverimage : bookcover.src} alt={book.title} width={300} height={500}/>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography variant="h2" sx={{color:theme.palette.text.secondary, mb: 2}}>{`${book.title}`}</Typography>
                                    <BookInformationTypography />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
              <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button variant="contained" autoFocus onClick={() => {setshowConfirmationDialog({open: true, task: "remove"});}}>
                        Remove from shelf
                    </Button> 
              </DialogActions>
         </Dialog>

         {
                    showConfirmationDialog && 
                    <Dialog
                        open={showConfirmationDialog.open}
                        onClose={()=>{setshowConfirmationDialog({open: false, task: "none"});}}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Removing Book From Shelf"}
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
                                    {"DELETEBOOK"}
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
                            <Button onClick={()=>{setshowConfirmationDialog({open: false, task: "none"});}}>Cancel</Button>
                            <Button onClick={() => {setConfirmationText(''); setshowConfirmationDialog({open: false, task: "none"});}} autoFocus disabled={confirmationText !== "DELETEBOOK"}>
                              Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
              }

        </ThemeProvider>
        </React.Fragment>
    )
}
