import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box, ThemeProvider } from '@mui/material';
import theme from '../Themes';
import { BookCardProps } from '../interfaceModels';
import Link from 'next/link';

export default function BookCard({ id, image, title, description, rating, onLearnMore}: BookCardProps) {
    const [value, setValue] = React.useState<number | null>(rating);
    return(
        <ThemeProvider theme={theme}>
                <Card sx={{ 
                    minWidth: 210,
                    maxWidth: 250,
                    minHeight: 320,
                    maxHeight: 360,
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    transition: '0.5s', // Add transition for smooth elevation
                    ':hover': {
                    transform: 'translateY(-8px)', // Elevate the card on hover
                    },
                }}>
                    <CardMedia
                        sx={{ 
                                height: 250, 
                                backgroundImage: `url(${image})`,
                                objectFit: 'cover',
                            }}
                    />
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="body1" component="div">
                                {title.length > 10 ? `${title.substring(0, 10)}...` : title}
                            </Typography>
                            <Rating name="read-only" value={value} readOnly sx={{mb:1}}/>
                            <Typography variant="body2" color="text.secondary">
                                Jhon Greesham 
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
        </ThemeProvider>
    );
}