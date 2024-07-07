'use client';
import React from 'react';
import { DashboardSize } from "@/Components/DashboardSize";
import theme from "@/Components/Themes";
import { Box, Button, CssBaseline, FormControl, Grid, InputLabel,  Paper, Rating, Select, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material";
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import ImageUrlDialog from './ImageUrlDialog';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = DashboardSize;

export default function AddBookManualComponent() 
{
    const [showImageDialog, setShowImageDialog] = React.useState(false);
    const [bookImage, setBookImage] = React.useState('');  
    const [bookTitle, setBookTitle] = React.useState('');
    const [authors, setAuthors] = React.useState('');
    const [rating, setRating] = React.useState(0);
    const [category, setCategory] = React.useState('');
    const [pageCount, setPageCount] = React.useState('');
    const [publisher, setPublisher] = React.useState('');
    const [publishedDate, setPublishedDate] = React.useState('');
    const [bookDescription, setBookDescription] = React.useState('');
    const [availability, setAvailability] = React.useState(true);
    const [IsFeaturedBook, setIsFeaturedBook] = React.useState(false);
    const [loadingImage, setLoadingImage] = React.useState(true);  
    const onClose = () => 
    {
        console.log("was called");
        setShowImageDialog(false);
    }  

    const onClickofImage = () =>
    {
        setShowImageDialog(true);
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />           
        <Box sx={{ 
                display: 'flex',
                }}>
                <CssBaseline />
                    <Box
                        component="main"
                        sx={{width: { sm: `calc(100% - ${drawerWidth}px)`}, marginLeft: { sm: `${drawerWidth}px` }, }}
                    >
                        <Toolbar />          
                        <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            p:1.5
                        }}
                        >
                            <Typography variant="h3" sx={{mb:2}}>
                                Add a <span style={{color: theme.palette.text.secondary,}}>new book</span> to the library
                            </Typography>
                            <Paper elevation={3} sx={{p:2, mb:2, width:'100%'}}>
                                    <Grid container spacing={1}>
                                    <Grid item xs={12} sm={4}>
                                        <Box 
                                            component="label" 
                                            htmlFor="upload-button"
                                            sx={{ 
                                                width: 350,
                                                height: 450,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px dashed grey',
                                                mb:2,
                                            }}
                                        >
                                            {
                                                bookImage.length > 0 ?
                                                <Box sx={{ position: 'relative', width: 350, height: 450, '&:hover button': { opacity: 1} }}>
                                                     <Box sx={{ 
                                                        position: 'absolute', 
                                                        top: 0, 
                                                        right: 0, 
                                                        bottom: 0, 
                                                        left: 0,
                                                        '&:hover::after': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        left: 0,
                                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                        },
                                                    }}>
                                                        <Image src={bookImage} alt="Book Image" width={350} height={450}/>
                                                    </Box>
                                                    <Button 
                                                        sx={{ 
                                                            position: 'absolute', 
                                                            top: '50%', 
                                                            left: '50%', 
                                                            transform: 'translate(-50%, -50%)', 
                                                            opacity: 0,  
                                                            transition: 'opacity 0.3s' 
                                                        }}
                                                        variant="contained"
                                                        onClick={onClickofImage}
                                                    >
                                                        Edit Image
                                                    </Button>
                                                </Box>
                                                :
                                                <>
                                                    <Button variant="contained" component="span" onClick={onClickofImage}>
                                                        Upload Image
                                                    </Button>
                                                </>
                                            }

                                            {
                                                showImageDialog &&
                                                <ImageUrlDialog bookImage={bookImage} setBookImage={setBookImage} open={showImageDialog} onClose={onClose}/>
                                            }

                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={8}>
                                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                                <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label="Book Title"
                                                variant="outlined"
                                                sx={{mb:2}}
                                                value={bookTitle}
                                                onChange={(e) => setBookTitle(e.target.value)}
                                            />
                                        </Box>
                                        <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label="Authors"
                                                variant="outlined"
                                                sx={{mb:2}}
                                                value={authors}
                                                onChange={(e) => setAuthors(e.target.value)}
                                        />

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Typography variant="body1" sx={{
                                                mr:1
                                            }}>
                                                Rating: 
                                            </Typography>
                                            <Rating value={rating}onChange={(event, newValue) => { setRating(newValue !== null ? newValue : 0);}}/>
                                        </Box>

                                        <TextField 
                                                fullWidth
                                                id="outlined-basic"
                                                label="Category"
                                                variant="outlined"
                                                sx={{mb:2}}
                                                value = {category}
                                                onChange={(e) => setCategory(e.target.value)}
                                        />
                                           <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            label="Page Count"
                                            variant="outlined"
                                            type="number"
                                            InputProps={{ inputProps: { min: 0 } }}
                                            sx={{mb:2}}
                                            value = {pageCount}
                                            onChange={(e) => setPageCount(e.target.value)}
                                        />

                                        <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label="Publisher"
                                                variant="outlined"
                                                sx={{mb:2}}
                                                value = {publisher}
                                                onChange={(e) => setPublisher(e.target.value)}
                                        />

                                         
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoItem sx={{ mb:2 }}>
                                                <DatePicker 
                                                value={dayjs(publishedDate)} 
                                                onChange={(newValue) => {
                                                    setPublishedDate(newValue ? newValue.format('YYYY-MM-DD') : '');
                                                }}
                                                />
                                            </DemoItem>
                                        </LocalizationProvider>

                                        <TextField
                                                id="outlined-multiline-static"
                                                label="Book Description"
                                                multiline
                                                rows={7}
                                                fullWidth
                                                variant="outlined"
                                                sx={{mb:2}}
                                                value={bookDescription}
                                                onChange={(e) => setBookDescription(e.target.value)}
                                            />
                                        
                                        <FormControl fullWidth sx={{mb:2}}>
                                            <InputLabel id="availability-select-label">Is Featured Book</InputLabel>
                                            <Select
                                                labelId="availability-select-label"
                                                id="availability-select"
                                                value={IsFeaturedBook}
                                                label="Availability"
                                                onChange={(e) => setIsFeaturedBook(e.target.value as boolean)}
                                            >
                                                <MenuItem value="true">True</MenuItem>
                                                <MenuItem value="false">False</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth sx={{mb:2}}>
                                            <InputLabel id="availability-select-label">Availability</InputLabel>
                                            <Select
                                                labelId="availability-select-label"
                                                id="availability-select"
                                                value={availability}
                                                label="Availability"
                                                onChange={(e) => setAvailability(e.target.value as boolean)}
                                            >
                                                <MenuItem value="true">True</MenuItem>
                                                <MenuItem value="false">False</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    </Box>
                </Box>
        </ThemeProvider>
    )
}