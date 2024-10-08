'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Book } from '../../../interfaceModels';
import { Alert, Box, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Rating, Select, Snackbar, TextField, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import theme from '@/Components/Themes';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import {  getAuthors, getCategories, getPublishers } from '@/Services/BookRoutines';
import { addBookToLibrary } from '@/Services/LibrarianRoutines';
import { DeleteBook, isBookAlreadyInShelf } from '@/Services/LibrarianRoutines';
import bookcover from '@/assets/bookcover.png'
import checkImage from '@/assets/checkImage.png'
import { usePathname, useRouter } from 'next/navigation';

export default function BookDisplayDialog({open, handleClose, book, setAlertOpen, setAlertContent}: 
    {
        open: boolean, 
        book: Book,
        handleClose: () => void,
        setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
        setAlertContent: React.Dispatch<React.SetStateAction<{severity: "success" | "error" | "info" | "warning" | undefined; message: string;}>>
    }) 
{
    const pathname = usePathname();
    const currentPathname = pathname.split("/")[2];
    
    const [isEditing, setIsEditing] = React.useState(false);
    const [title, setTitle] = React.useState(book.title);
    const [authors, setAuthors] = React.useState(book.authors.join(', '));
    const [description, setDescription] = React.useState(book.description);
    const [category, setCategory] = React.useState(book.category);
    const [publisher, setPublisher] = React.useState(book.publisher);
    const [pageCount, setPageCount] = React.useState(book.pagecount);
    const [rating, setRating] = React.useState(book.rating);
    const [publishedDate, setPublishedDate] = React.useState(dayjs(new Date(book.publishedDate)));
    const [isFeaturedBook, setIsFeaturedBook] = React.useState(book.isFeaturedBook);
    const [availability, setAvailability] = React.useState(book.availability);

    const [alreadyInShelf, setAlreadyInShelf] = React.useState(false);
    const [addedSuccessfully, setAddedSuccessfully] = React.useState(false);

    //===============================================================================================================
    const [editedAuthors, setEditedAuthors] = React.useState(book.authors as string[]);
    const [editedDescription, setEditedDescription] = React.useState(book.description);
    const [editedCategory, setEditedCategory] = React.useState(book.category);
    const [editedPublisher, setEditedPublisher] = React.useState(book.publisher);
    const [editedPageCount, setEditedPageCount] = React.useState(book.pagecount);
    const [editedRating, setEditedRating] = React.useState(book.rating);
    const [editedPublishedDate, setEditedPublishedDate] = React.useState(dayjs(new Date(book.publishedDate)));

    const [editedisFeaturedBook, setIsEditedFeaturedBook] = React.useState(book.isFeaturedBook);
    const [editedavailability, setEditedAvailability] = React.useState(book.availability);

    const [AllAuthors, setAllAuthors] = React.useState<string[]>([]);
    const [AllPublishers, setAllPublishers] = React.useState<string[]>([]);
    const [AllCategories, setAllCategories] = React.useState<string[]>([]);

    const [confirmationText, setConfirmationText] = React.useState('' as string);
    const [showConfirmationDialog, setshowConfirmationDialog] = React.useState({open: false, task: "" as "add" | "remove"| "none"});
    const router = useRouter();

    React.useEffect(()=>{
         const fetchData = async() => {
            const authors = await getAuthors();
            if(authors.success)
            {
                setAllAuthors(authors.data.flatMap((item: { authors: string }) => item.authors));
            }
            const Categories = await getCategories();
            if(Categories.success)
            {
                setAllCategories(Categories.data);
            }
            const Publishers = await getPublishers();
            if(Publishers.success)
            {
                setAllPublishers(Publishers.data);
            }
        }
        fetchData();
       
    },[])

    React.useEffect(() => {
      const fetchData = async () => { 
        const bookalreadyInshelf = await isBookAlreadyInShelf(title, authors.split(","));
        if(bookalreadyInshelf.success)
        {
            setAlreadyInShelf(true);
            setAlertOpen(true);
            setAlertContent({severity: 'info', message: bookalreadyInshelf.message});
        }
      }
      fetchData();
    },[])
     

    function handleSave()
    {
      setAuthors(editedAuthors.join(', '));
      setDescription(editedDescription);
      setCategory(editedCategory);
      setPublisher(editedPublisher);
      setPageCount(editedPageCount);
      setRating(editedRating);
      setPublishedDate(editedPublishedDate);
      setIsFeaturedBook(editedisFeaturedBook);
      setAvailability(editedavailability);
    }

    function handleCancel() 
    {
      setEditedAuthors(authors.split(','));
      setEditedDescription(description);
      setEditedCategory(category);
      setEditedPublisher(publisher);
      setEditedPageCount(pageCount);
      setEditedRating(rating);
      setEditedPublishedDate(publishedDate);
      setIsEditedFeaturedBook(isFeaturedBook);
      setEditedAvailability(availability);
    }

    async function addToshelf()
    {
        if(!title || !authors)
        {
          setAlertOpen(true);
          return setAlertContent({severity: 'error', message: "Title and Authors are required"});
        }
        
        const response = await addBookToLibrary({
          title: title || 'N/A',
          authors: authors ? authors.split(',') : ['N/A'],
          description: description || 'N/A',
          ISBN: book.ISBN || 'N/A',
          coverimage: book.coverimage || 'N/A',
          availability: availability || true,
          category: category || 'N/A',
          publisher: publisher || 'N/A',
          publishedDate: publishedDate ? publishedDate.toDate() : new Date(),
          pagecount: pageCount || 0,
          rating: rating || 0,
          isFeaturedBook: isFeaturedBook || false
        });

        if(response.success)
        {
            setAlertOpen(true);
            setAlertContent({severity: 'success', message: "book added to Libraiary successfully"});
            setAddedSuccessfully(true);
            window.open(`/librarian/book/${response.book.id}`, '_blank');
        }
        else
        {
            setAlertOpen(true);
            setAlertContent({severity: 'error', message: "unable to add book to Libraiary successfully"});
        }
    }

    async function deleteFromShelf()
    {
      const response = await DeleteBook(title, authors.split(','));
      if(response.success)
      {
          setAlertOpen(true);
          setAlertContent({severity: 'success', message: "book deleted from Libraiary successfully"});
          setAddedSuccessfully(false);
      }
      else
      {
          setAlertOpen(true);
          setAlertContent({severity: 'error', message: "unable to delete book from Libraiary successfully"});
      }

    }
    

    const BookInformationTypography = () => 
    {

      return(
        <>
          <Typography variant="h6" sx={{mb: 2}}>{`Author(s): ${editedAuthors}`}</Typography>
          <Rating name="read-only" value={editedRating} readOnly  sx={{mb:2}}/>
          <Typography variant="body1" sx={{mb: 2}}>{`Description: ${editedDescription}`}</Typography>
          <Typography variant="body1" sx={{mb: 2}}>{`Category: ${editedCategory}`}</Typography>
          <Typography variant="body1" sx={{mb: 2}}>{`Publisher: ${editedPublisher}`}</Typography>
          <Typography variant="body1" sx={{mb: 2}}>{`Page Count: ${editedPageCount}`}</Typography>
          <Typography variant="body1" sx={{mb: 2}}>
            {`Published Date: ${editedPublishedDate}`}
          </Typography>
          <Typography variant="body1" sx={{mb: 2}}>{`Is Featured: ${isFeaturedBook}` }</Typography>
          <Typography variant="body1" sx={{mb: 2}}>{`Is Available: ${availability}`}</Typography>
        </>
      )
    }

    return (
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
              {
                !addedSuccessfully? 
                <>
                <DialogTitle sx={{width: '100%'}}>
                {"Check the book details before adding to shelf"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      {
                        isEditing ?
                        <Box sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-end', gap:0.5}}>
                          <IconButton onClick={() => {setIsEditing(!isEditing); handleCancel()}}><ClearIcon sx={{color: 'red', fontSize: '2rem', cursor: 'pointer', float: 'right'}}/></IconButton>
                          <IconButton onClick={() => {setIsEditing(!isEditing); handleSave()} }><CheckIcon sx={{color: theme.palette.primary.main,fontSize: '2rem', cursor: 'pointer', float: 'right'}}/></IconButton>
                        </Box>
                        : <Tooltip title = "Edit the book content" placement='top'>
                            <EditIcon onClick={() => setIsEditing(!isEditing)} sx={{cursor: 'pointer', float: 'right'}}/>
                          </Tooltip>
                      }
                      

                        <Grid container spacing={2} sx={{
                          color: theme.palette.text.primary,
                        }}>
                            <Grid item xs={12} sm={4}>  
                                <Image src={book.coverimage !=='N/A'? book.coverimage : bookcover.src} alt={book.title} width={300} height={500}/>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography variant="h2" sx={{color:theme.palette.text.secondary, mb: 2}}>{`${book.title}`}</Typography>
                                {!isEditing ? <BookInformationTypography /> :
                                            <>
                                              <Autocomplete
                                                id="authors"
                                                multiple
                                                options={AllAuthors}
                                                value={editedAuthors}
                                                onChange={(event, newInputValue) => {
                                                  setEditedAuthors(newInputValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Authors" fullWidth variant="outlined" sx={{mb: 2}}/>}
                                                renderTags={(value, getTagProps) =>
                                                  value.map((option, index) => {
                                                    const tagProps = getTagProps({ index });
                                                    return <Chip variant="outlined" label={option} {...tagProps} key={index} />;
                                                  })
                                                }
                                              />


                                                <Box display="flex" alignItems="center" >
                                                  <Typography variant="h6" sx={{mb: 2, mr: 1}}>
                                                    {`Rating:`}
                                                  </Typography>
                                                  <Rating value={editedRating} onChange={(event, newValue) => {
                                                    setEditedRating(newValue as number);
                                                  } } sx={{mb: 2}}/>
                                                </Box>
                                              
                                                <TextField
                                                  multiline
                                                  id="description"
                                                  label="Description"
                                                  value={editedDescription}
                                                  onChange={(e) => setEditedDescription(e.target.value)}
                                                  fullWidth
                                                  variant="outlined"
                                                  sx={{mb: 2}}
                                                />

                                                <Autocomplete
                                                  id="combo-box-demo"
                                                  options={AllCategories}
                                                  value={editedCategory}
                                                  freeSolo
                                                  onInputChange={(event, newInputValue) => {
                                                    setEditedCategory(newInputValue);
                                                  }}
                                                  renderInput={(params) => <TextField {...params} label="Category" fullWidth variant="outlined" sx={{mb: 2}}/>}
                                                />

                                                <Autocomplete
                                                  id="publishers"
                                                  options={AllPublishers}
                                                  value={editedPublisher}
                                                  onInputChange={(event, newInputValue) => {
                                                    setEditedPublisher(newInputValue);
                                                  }}
                                                  renderInput={(params) => <TextField {...params} label="Publishers" fullWidth variant="outlined" sx={{mb: 2}}/>}
                                                />

                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="Page Count"
                                                    variant="outlined"
                                                    type="number"
                                                    value={editedPageCount}
                                                    InputProps={{ inputProps: { min: 0 } }}
                                                    sx={{mb:2}}
                                                    onChange={(e) =>  setEditedPageCount(Number(e.target.value))}
                                                />

                                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                                    <DemoItem sx={{ mb:2 }}>
                                                        <DatePicker 
                                                            value={editedPublishedDate} 
                                                            onChange={(newDate) => {
                                                                if (newDate) {
                                                                    setEditedPublishedDate(newDate);
                                                                }
                                                            }}
                                                        />
                                                    </DemoItem>
                                                </LocalizationProvider>

                                                <FormControl fullWidth sx={{ mb:2 }}>
                                                    <InputLabel id="isfeatured-select-label">Is Featured Book</InputLabel>
                                                    <Select
                                                        labelId="isfeatured-select-label"
                                                        id="isfeatured-select"
                                                        value={editedisFeaturedBook ? 'true' : 'false'}
                                                        label="Is Featured Book"
                                                        onChange={(e) => setIsEditedFeaturedBook(e.target.value === 'true' ? true : false)}
                                                    >
                                                        <MenuItem value="true">True</MenuItem>
                                                        <MenuItem value="false">False</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <FormControl fullWidth sx={{ mb:2 }}>
                                                  <InputLabel id="availability-select-label">Availability</InputLabel>
                                                  <Select
                                                    labelId="availability-select-label"
                                                    id="availability-select"
                                                    value={editedavailability ? 'true' : 'false'}
                                                    label="Availability"
                                                    onChange={(e) =>  setEditedAvailability(e.target.value === 'true' ? true : false)}
                                                  >
                                                    <MenuItem value="true">True</MenuItem>
                                                    <MenuItem value="false">False</MenuItem>
                                                  </Select>
                                                </FormControl>
                                            </>
                                }
                            </Grid>
                        </Grid>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={()=>{setshowConfirmationDialog({open: true, task: "add"});}} autoFocus disabled={alreadyInShelf}>
                    add to shelf
                  </Button>
                </DialogActions>
              </>
              :
              <>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 0.5
                    }}
                  >
                    <Typography variant="h6" sx={{width: '100%'}}>{book.title} is added to shelf</Typography>
                    <Image src={checkImage.src} alt="checkImage" width={500} height={400}/>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button  autoFocus onClick={() => {setshowConfirmationDialog({open: true, task: "remove"});}}>
                    Remove from shelf
                  </Button>
                  <Button onClick={handleClose}>Close</Button>
              </DialogActions>
              </>
              }
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
                            {showConfirmationDialog.task === 'add' ? "Adding Book To Shelf": "Removing Book From Shelf"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Typography variant= "body1" sx={{
                                    mb:1, 
                                    color: theme.palette.text.secondary,
                                }}>
                                    {showConfirmationDialog.task === 'add' ? 
                                      'Please confirm all book Details by typing the below text' : 
                                      'Please confirm you want to remove the book by typing the below text'
                                    }
                                </Typography>
                                <Typography variant='body1' sx={{
                                  mb:1,
                                  color: theme.palette.primary.main,
                                }}>
                                  {
                                    showConfirmationDialog.task === 'add' ? 
                                    `"ADDBOOK"` : 
                                    `"DELETEBOOK"`
                                  }
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
                            <Button onClick={() => {showConfirmationDialog.task === 'add'? addToshelf(): deleteFromShelf() ; setConfirmationText(''); setshowConfirmationDialog({open: false, task: "none"});}} autoFocus disabled={(showConfirmationDialog.task === 'add' && confirmationText !== "ADDBOOK") || (showConfirmationDialog.task === 'remove' && confirmationText !== "DELETEBOOK")}>
                              Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
              }
          </ThemeProvider>
        </React.Fragment>
      );
}