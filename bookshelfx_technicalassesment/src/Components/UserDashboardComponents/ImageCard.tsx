import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../Themes';
import { BookCardProps } from '../interfaceModels';

export default function BookCard({image, rating}: BookCardProps) 
{
    const [value, setValue] = React.useState<number | null>(rating);

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    width: '30%',
                    height: '140px', // Set a height for the box
                    backgroundImage: `url(${image})`, // Replace with your image path
                    backgroundSize: 'cover', // Cover the box with the image
                    backgroundPosition: 'center', // Center the image
                    position: 'relative', // Add this to position the rating
                    ':hover': {
                        '& .rating': {
                            visibility: 'visible', // Show the rating on hover
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute', // Position the rating
                        top: 0, // Position the rating at the top
                        right: 0, // Position the rating at the right
                        visibility: 'hidden', // Hide the rating by default
                        className: 'rating', // Add a class name to target with hover
                        bgcolor: 'rgba(0, 0, 0, 0.5)', // Add a background color to the rating box
                        color: 'white', // Set the color of the rating text
                        p: 1, // Add some padding to the rating box
                    }}
                >
                    <Rating
                        name="read-only"
                        value={value}
                        readOnly
                    />
                </Box>
            </Box>
        </ThemeProvider>
    )
}