import * as React from 'react';
import { Box, CssBaseline, Rating, ThemeProvider } from '@mui/material';
import theme from '../Themes';
import { ImageCardProps } from '../interfaceModels';

export default function ImageCard({image, rating, title}: ImageCardProps) 
{
    const [value, setValue] = React.useState<number | null>(rating);
    console.log(image);
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ 
                minHeight: 180,
                minWidth: 100,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
 
                transition: 'transform .3s',  
                position: 'relative', // Add this
                ':hover': {
                    transform: 'translateY(-8px)', 
                },
                ':hover div': { // Add this
                    opacity: 1,
                },
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    mt:1.5,
                    mb:1.5,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust color and opacity as needed
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    opacity: 0,
                    transition: 'opacity .3s',
                }}>
                    <Box sx={{ alignSelf: 'center' }}>
                        ★ {value}  
                    </Box>
                    {title?.length > 8 ? `${title.substring(0, 8)}...` : title}
                </Box>
            </Box>
        </ThemeProvider>
    )
}