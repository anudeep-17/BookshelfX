import * as React from 'react';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box, Button, ThemeProvider, Tooltip } from '@mui/material';
import theme from '../../../Themes';
import { Book  } from '../../../interfaceModels';
import BookDisplayDialog from './BookDisplayDialog';


export default function BookDisplayCard({book}:{book: Book }) {
    const [value, setValue] = React.useState<number | null>(book.rating || null);
    
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClick = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: {xs:'35%', sm:'40%'}, // Increased size
                    maxWidth: {xs:'100%', sm:'40%'}, // Increased size
                    minHeight: 600, // Increased size
                    maxHeight: 600, // Increased size
                    transition: '0.5s', // Add transition for smooth elevation
                    ':hover': {
                        transform: 'translateY(-8px)', // Elevate the card on hover
                        boxShadow: '0 3px 10px #3f51b5',
                        cursor: 'pointer',
                        
                    },
                    borderRadius: '10px 10px 10px 10px', // Make top borders curved
                }}
                onClick={handleClick}
                >
                    <Box sx={{ 
                        height: 400, // Increased size
                        backgroundImage: `url(${book.coverimage})`,
                        backgroundSize: 'cover', // Add this to fit the image
                        backgroundPosition: 'center', // Add this to center the image
                        borderRadius: '10px 10px 0 0', // Make top borders curved
                        borderTop: '0.05px solid rgb(169, 169, 169)', // Add border to the top
                        borderLeft: '0.05px solid rgb(169, 169, 169)', // Add border to the left
                        borderRight: '0.05px solid rgb(169, 169, 169)', // Add border to the right
                    }}/> 
                    <Box sx={{ 
                        padding: 2, // Add some padding
                        boxShadow: '0 0.9px 0.8px 0.2px rgba(0, 0, 0, .3)', // Reduced shadow to create less elevation effect
                        borderRadius: '0 0 10px 10px',
                    }}>
                        <Typography variant="h6" component="div">
                            {book.title.length > 30 ? `${book.title.substring(0, 30)}...` : book.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{
                            mb:0.5
                        }}>
                            {book.authors.join(", ")}
                        </Typography>
                        
                        <Rating name="read-only" value={value} readOnly sx={{
                            mb:1
                        }}/>
                        
                        <Typography variant="body2" color="text.secondary" sx={{
                            minHeight: '80px',
                            textAlign: 'justify',
                            mb:0.5
                        }}>
                            {book.description.length > 100 ? `${book.description.substring(0, 100)}...` : book.description}
                        </Typography>
                    </Box>
                    
                </Box>
                {
                    openDialog &&
                    <BookDisplayDialog open={openDialog} setOpen={setOpenDialog} book={book} handleClose={handleClose}/>
                }
                    
        </ThemeProvider>
    );
}
 