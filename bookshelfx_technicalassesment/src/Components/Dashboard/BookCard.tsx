import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { ThemeProvider } from '@mui/material';
import theme from '../Themes';
import { BookCardProps } from '../Book';

export default function BookCard({ image, title, description, rating, onLearnMore}: BookCardProps) {
    const [value, setValue] = React.useState<number | null>(rating);
    return(
        <ThemeProvider theme={theme}>
          <Card sx={{ 
                maxWidth: 330, 
                minWidth:330,
                maxHeight: 480,
                minHeight: 480,
                mb:3, 
                ml:2,
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between' 
            }}>
                <CardMedia
                    sx={{ height: 200, flex: '0 0 auto' }}
                    image={image}
                    title={title}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Rating name="read-only" value={value} readOnly sx={{mb:1}}/>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ flex: '0 0 auto' }}>
                    <Button size="small">Checkout</Button>
                    <Button size="small" onClick={onLearnMore}>Learn More.</Button>
                </CardActions>
            </Card>
        </ThemeProvider>
    );
}