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

export interface BookCardProps {
    image: string;
    title: string;
    description: string;
    rating: number;
}

export default function BookCard({ image, title, description, rating }: BookCardProps) {
    const [value, setValue] = React.useState<number | null>(rating);
    return(
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 345, minWidth:345, mb:2, ml:2}}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Rating name="read-only" value={value} readOnly sx={{mb:1}}/>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </ThemeProvider>
    );
}