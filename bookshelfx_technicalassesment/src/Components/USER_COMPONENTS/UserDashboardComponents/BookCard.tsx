import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box, ThemeProvider } from '@mui/material';
import theme from '../../Themes';
import { BookCardProps } from '../../interfaceModels';


export default function BookCard({coverimage, title, rating, authors, onMouseEnter}: BookCardProps) {
    const [value, setValue] = React.useState<number | null>(rating || null);

    return(
        <ThemeProvider theme={theme}>
          <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                minWidth: {xs:'45%', sm:'19%'}, // Increased size
                maxWidth: {xs:'100%', sm:'20%'}, // Increased size
                minHeight: 300, // Increased size
                maxHeight: 300, // Increased size
                transition: '0.5s', // Add transition for smooth elevation
                ':hover': {
                    transform: 'translateY(-8px)', // Elevate the card on hover
                },
            }}
            onMouseEnter={onMouseEnter}
            >
                <Box sx={{ 
                    height: 230, // Increased size
                    backgroundImage: `url(${coverimage})`,
                    backgroundSize: 'cover', // Add this to fit the image
                    backgroundPosition: 'center', // Add this to center the image
                    borderRadius: '10px 10px 0 0', // Make top borders curved
                }}/> 
                <Box sx={{ 
                    padding: 2, // Add some padding
                    boxShadow: '0 0.9px 0.8px 0.2px rgba(0, 0, 0, .3)', // Reduced shadow to create less elevation effect
                    borderRadius: '0 0 10px 10px',
                }}>
                    <Typography variant="body1" component="div">
                        {title.length > 10 ? `${title.substring(0, 10)}...` : title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                    {authors.join(', ')}
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
 