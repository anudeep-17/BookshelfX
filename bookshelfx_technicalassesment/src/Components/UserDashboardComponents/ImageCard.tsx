import * as React from 'react';
import { Box, CssBaseline, Rating, ThemeProvider } from '@mui/material';
import theme from '../Themes';
import { ImageCardProps } from '../interfaceModels';

export default function ImageCard({image, rating, title, onMouseEnter}: ImageCardProps) 
{
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ 
                minHeight: 180,
                minWidth: 100,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mb:2,
                transition: 'transform .3s',  
                position: 'relative', // Add this
                ':hover': {
                    transform: 'translateY(-8px)', 
                },
                ':hover div': { // Add this
                    opacity: 1,
                },
            }}
            onMouseEnter={onMouseEnter}
            >
                <Box sx={{
                    position: 'absolute',
                    top: -10,
                    left: 0,
                    right: 0,
                    bottom: -10,
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
                        ★ {rating}  
                    </Box>
                    {title?.length > 8 ? `${title.substring(0, 8)}...` : title}
                </Box>
            </Box>
        </ThemeProvider>
    )
}