'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import Image from 'next/image';
import DashBoardImage from "../../assets/Dasboard_image1.jpg"
import { InputAdornment, TextField, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { AccountCircle } from '@mui/icons-material';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import BookCard from './BookCard';

export default function Dashboard_Home()
{
    const[searchLabel, setSearchLabel] = React.useState("Search for books, authors, genres...")

    return(
        <ThemeProvider theme={theme}>
            <Navbar/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: ['column', 'column'], // column layout for small screens, row layout for larger screens
                    width: '100%',
                    height: '100%',
                    overflowX: 'hidden', // disable horizontal scrolling
                    overflowY: 'hidden', // disable vertical scrolling
                    margin: 0, // remove margin
                    padding: 0, // remove padding
                }}
            >
                <Box sx={{
                    position: 'relative', // make this box positioned
                    width: ['100%', '100%'], // full width on small screens, half width on larger screens
                    display: 'flex',
                    minHeight: ['80vh','80vh'],
                    backgroundImage: `url(${DashBoardImage.src})`, 
                    backgroundSize: 'cover',
                    backgroundImagePosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    zIndex: -1,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        background: 'rgba(255, 255, 240, 0.3)',  
                        backdropFilter: 'blur(5px)',
                      },
                }}>
                </Box>
                <Box sx={{ 
                    width: ['60%','75%'],
                    zIndex: 1, 
                    position: 'absolute',
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    textAlign: 'center' }}
                >
                    <Typography variant="h3" letterSpacing={4} sx={{fontWeight:"bold"}}> 
                         &quot;Discover, Explore, Read: Your Personal Gateway to Infinite Worlds&quot;
                    </Typography>
                    <Typography variant="body1" letterSpacing={1} sx={{fontWeight:"bold"}}> 
                        Welcome to BookshelfX: your gateway to infinite worlds. Explore captivating stories and discover new adventures with ease.
                    </Typography>
                     
                    <TextField 
                        id="input-with-icon-textfield" 
                        fullWidth
                        label={searchLabel}
                        variant="outlined"
                        onFocus={() => setSearchLabel("")} // Change the label text when the TextField is focused
                        onBlur={() => setSearchLabel("Search for books, authors, genres...")} // Change the label text back when the TextField loses focus
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SavedSearchIcon sx={{
                                        fontSize:"3rem",
                                        color: theme.palette.text.secondary,
                                        zIndex: 1
                                    }}/>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width:"100%",
                            marginTop:5,
                            color: 'black', // Change the color of the text to black
                            '& .MuiOutlinedInput-root': { // Change the border radius of the TextField
                                borderRadius: '50px',
                                '&.Mui-focused': {
                                    color: 'black', // Change the color of the text to black when the TextField is focused
                                },
                            },
                            '& .MuiOutlinedInput-notchedOutline': { // Change the border color of the TextField
                                borderColor: 'white',
                                backgroundColor: 'rgba(255,255,255,0.7)', // Make the background less opaque
                            },
                            '& .MuiOutlinedInput-input': { // Change the color of the input text when the TextField is focused
                                '&.Mui-focused': {
                                    color: 'black',
                                },
                            },
                        }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: ['column', 'row'], // column layout for small screens, row layout for larger screens
                    flexWrap: 'wrap', // allow cards to wrap to the next line
                    width: '100%',
                    height: '100%',
                    mt: 2,
                    ml: 2,
                }}>
                    <BookCard 
                        image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                        title="The Great Gatsby"
                        description="The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."
                        rating={4}
                   />
                    <BookCard 
                        image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                        title="The Great Gatsby"
                        description="The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."
                        rating={4}
                    />
                    <BookCard
                        image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                        title="The Great Gatsby"
                        description="The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."
                        rating={4}
                    />
                    <BookCard
                        image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                        title="The Great Gatsby"
                        description="The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."
                        rating={4}
                    />
                     <BookCard
                        image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                        title="The Great Gatsby"
                        description="The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."
                        rating={4}
                   />
                     <BookCard
                        image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                        title="The Great Gatsby"
                        description="The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."
                        rating={4}
                    />
                     <BookCard
                        image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                        title="The Great Gatsby"
                        description="The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."
                        rating={4}
                    />
                     <BookCard
                        image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                        title="The Great Gatsby"
                        description="The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."
                        rating={4}
                    />
                    <BookCard
                        image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                        title="The Great Gatsby"
                        description="The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."
                        rating={4}  
                    />
                     <BookCard
                        image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                        title="The Great Gatsby"
                        description="The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."
                        rating={4}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    )
}
 