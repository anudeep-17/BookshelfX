import * as React from 'react';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box, Button, ThemeProvider, Tooltip } from '@mui/material';
import theme from '../../../Themes';
import { BookCardProps } from '../../../interfaceModels';


export default function DetailedBookCard({coverimage, title, description, rating, authors, availability, onClick}: BookCardProps) {
    const [value, setValue] = React.useState<number | null>(rating || null);

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: {xs:'35%', sm:'30%'}, // Increased size
                    maxWidth: {xs:'100%', sm:'30%'}, // Increased size
                    minHeight: 600, // Increased size
                    maxHeight: 600, // Increased size
                    transition: '0.5s', // Add transition for smooth elevation
                    ':hover': {
                        transform: 'translateY(-8px)', // Elevate the card on hover
                        boxShadow: '0 3px 10px #3f51b5',
                        cursor: 'pointer',
                        
                    },
                    backgroundColor: availability ? 'initial' : '#cccccc',
                    borderRadius: '10px 10px 10px 10px', // Make top borders curved
                }}
                onClick={onClick}
                >
                    <Box sx={{ 
                        height: 400, // Increased size
                        backgroundImage: `url(${coverimage})`,
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
                            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{
                            mb:0.5
                        }}>
                            {authors.join(", ")}
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
                            Checkout
                        </Button>
                    </Box>
     
                </Box>
        </ThemeProvider>
    );
}
 