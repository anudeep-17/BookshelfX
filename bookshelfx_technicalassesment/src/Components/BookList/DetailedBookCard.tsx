import * as React from 'react';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box, ThemeProvider } from '@mui/material';
import theme from '../Themes';
import { BookCardProps } from '../interfaceModels';


export default function DetailedBookCard({bookimage, title, description, rating}: BookCardProps) {
    const [value, setValue] = React.useState<number | null>(rating || null);

    return(
        <ThemeProvider theme={theme}>
          <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                minWidth: '20%', // Increased size
                maxWidth: '30%', // Increased size
                minHeight: 550, // Increased size
                maxHeight: 550, // Increased size
                transition: '0.5s', // Add transition for smooth elevation
                ':hover': {
                    transform: 'translateY(-8px)', // Elevate the card on hover
                },
            }}
            >
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
                        Jhon Greesham 
                    </Typography>
                    
                    <Rating name="read-only" value={value} readOnly sx={{
                        mb:1
                    }}/>
                    
                    <Typography variant="body2" color="text.secondary" sx={{
                        mb:1,
                        minHeight: '80px',
                        textAlign: 'justify',
                    }}>
                        {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
 