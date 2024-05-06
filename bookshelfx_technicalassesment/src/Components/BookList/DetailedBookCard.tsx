import * as React from 'react';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box, Button, ThemeProvider, Tooltip } from '@mui/material';
import theme from '../Themes';
import { BookCardProps } from '../interfaceModels';


export default function DetailedBookCard({bookimage, title, description, rating, author, availability}: BookCardProps) {
    const [value, setValue] = React.useState<number | null>(rating || null);

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: {xs:'35%', sm:'20%'}, // Increased size
                    maxWidth: {xs:'100%', sm:'30%'}, // Increased size
                    minHeight: 600, // Increased size
                    maxHeight: 600, // Increased size
                    transition: '0.5s', // Add transition for smooth elevation
                    ':hover': {
                        transform: 'translateY(-8px)', // Elevate the card on hover
                    },
                    backgroundColor: availability ? 'initial' : '#cccccc',
                    borderRadius: '10px 10px 10px 10px', // Make top borders curved
                }}
                >
                   
                   {!availability? <Box sx={{
                        position: 'absolute',
                        background: 'rgba(255, 0, 0, 0.7)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: 'white',
                        padding: '2px 10px',
                    }}>
                        {availability ? '' : 'Not Available'}
                    </Box>: null}
                  
                    <Box sx={{ 
                        height: 400, // Increased size
                        backgroundImage: `url(${bookimage})`,
                        backgroundSize: 'cover', // Add this to fit the image
                        backgroundPosition: 'center', // Add this to center the image
                        borderRadius: '10px 10px 0 0', // Make top borders curved
                    }}/> 
                    <Box sx={{ 
                        padding: 2, // Add some padding
                        boxShadow: '0 0.9px 0.8px 0.2px rgba(0, 0, 0, .3)', // Reduced shadow to create less elevation effect
                        borderRadius: '0 0 10px 10px',
                    }}>
                        <Typography variant="h6" component="div">
                            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{
                            mb:0.5
                        }}>
                            {author}
                        </Typography>
                        
                        <Rating name="read-only" value={value} readOnly sx={{
                            mb:1
                        }}/>
                        
                        <Typography variant="body2" color="text.secondary" sx={{
                            minHeight: '80px',
                            textAlign: 'justify',
                            mb:0.5
                        }}>
                            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                        </Typography>

                        <Button variant="contained" color="primary" sx={{
                            mb:1
                        }} >
                            Learn More
                        </Button>
                    </Box>
     
                </Box>
        </ThemeProvider>
    );
}
 