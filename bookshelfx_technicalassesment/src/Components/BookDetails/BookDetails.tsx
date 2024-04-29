import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import {Book} from '../interfaceModels'; 
import Image from 'next/image';


export default function BookDetails({ISBN, bookimage, title, description, rating, publisher, publishedDate, category, pageCount, customerReviews}: Book)
{
 
    return(
        <ThemeProvider theme={theme}>
            
            <Box sx={{
                display: 'flex',
                flexDirection: ['column', 'row'], // column layout for small screens, row layout for larger screens
                width: '100%',
                height: '100%',
                overflowX: 'hidden', // disable horizontal scrolling
                overflowY: 'hidden', // disable vertical scrolling
                margin: 0, // remove margin
                padding: 0, // remove padding
                }}>
                
                <Box sx={{
                    zIndex: 0,
                    position: 'relative',
                    width: ['40%','50%'],
                    height: ['100%','100%'],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    overflow: 'hidden',
                    mt:2,
                    ml:2,
                }}>
                    <Image 
                        src={bookimage}
                        alt={title}
                        width={400}
                        height={600}
                        
                    />
                </Box>
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: ['column', 'column'], // column layout for small screens, row layout for larger screens
                    width: '100%',
                    height: '100%',
                    flexWrap: 'wrap',
                    mt:2,
                    justifyContent: 'start',
                    alignItems: 'start',
                    alignContent: 'center',
                    }}
                >
                    <Typography variant="h3" letterSpacing={4} sx={{fontWeight:"bold"}}> 
                         &quot;{title}&quot;
                    </Typography>
                    <Rating name="read-only" value={rating} readOnly sx={{mb:1,mt:1}}/>
                    <Typography variant="body1" letterSpacing={0} sx={{fontWeight:"bold", mt:2}}> 
                        ISBN: {ISBN}
                    </Typography>
                    <Typography variant="body1" letterSpacing={0} sx={{fontWeight:"bold", mt:2}}> 
                        Description of the book: {description}
                    </Typography>
                    <Typography variant="body1" letterSpacing={0} sx={{fontWeight:"bold",  mt:3}}> 
                        Publisher: {publisher}
                    </Typography>
                    <Typography variant="body1" letterSpacing={0} sx={{fontWeight:"bold",  mt:3}}> 
                        Published Date: {publishedDate}
                    </Typography>
                    <Typography variant="body1" letterSpacing={0} sx={{fontWeight:"bold",  mt:3}}> 
                        Category: {category}
                    </Typography>
                    <Typography variant="body1" letterSpacing={0} sx={{fontWeight:"bold", mt:3}}> 
                        Page Count: {pageCount}
                    </Typography>
                    <Typography variant="body1" letterSpacing={0} sx={{fontWeight:"bold", mt:3}}> 
                        Customer Reviews:
                    </Typography>
                    {
                        customerReviews.map((review, index) => (
                            <Typography variant="body2" letterSpacing={0} sx={{fontWeight:"bold"}} key={index}> 
                                {index+1}.&nbsp;&quot;{review}&quot;
                            </Typography>
                        ))
                    }
                </Box>
            </Box>
           
        </ThemeProvider>
    );
}