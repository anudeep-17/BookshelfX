import { Box, Button, CssBaseline, Divider, Rating, ThemeProvider, Tooltip, Typography } from '@mui/material';
import {Book} from '../interfaceModels';
import LibraryImage from "@/assets/Library.png";
import theme from '../Themes';
 

export default function BookDetails({ book }: { book?: Book }) 
{
    return(
        <ThemeProvider theme={theme}>
        {book?.title !== undefined?
            <>
            <Box 
            component="img" 
            src={book?.bookimage} 
            alt={book?.title} 
            sx={{ 
                width: 250, 
                height: 350, 
                objectFit: 'cover',
                mb:2
                }}
            />

            <Typography variant="h6" >
                {book?.title}
            </Typography>
            <Typography variant="body1" sx={{mb:2}} >
                {book?.author}
            </Typography>

            <Rating name="read-only" value={Number(book?.rating)} readOnly sx={{mb:1}}/>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    mb:1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        p:1.5
                    }}
                >
                    <Typography variant="body1" >
                        100
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: theme.palette.text.secondary
                    }}>
                        Pages
                    </Typography>
                </Box>
                
                <Divider orientation="vertical" flexItem />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        p:1.5
                    }}
                >
                    <Typography variant="body1">
                        643
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: theme.palette.text.secondary
                    }}>
                       Ratings
                    </Typography>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        p:1.5
                    }}
                >
                    <Typography variant="body1">
                        110
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: theme.palette.text.secondary
                    }}>
                        Reviews
                    </Typography>
                </Box>
            </Box>
            
            <Typography variant="body2" sx={{
                textAlign: 'center',
                fontSize: 12,
                p:1,
                height: '100px', // Set a fixed height
                overflow: 'auto' // Add a scrollbar if the content is too long
            }}>
                {book?.description}
            </Typography>
        </>
        :
        <>
            <Box 
                component="img" 
                src={LibraryImage.src} 
                alt="Library"
                sx={{ 
                    width: 200, 
                    height: 300, 
                    objectFit: 'cover',
                    mb:2
                }}
            />

            <Typography variant="h6" >
                BookShelfX
            </Typography>
            <Typography variant="body1" sx={{mb:2}} >
                Library
            </Typography>

            <Rating name="read-only" value={5} readOnly sx={{mb:1}}/>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    mb:1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        p:1.5
                    }}
                >
                    <Typography variant="body1" >
                        100
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: theme.palette.text.secondary
                    }}>
                        books
                    </Typography>
                </Box>
                
                <Divider orientation="vertical" flexItem />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        p:1.5
                    }}
                >
                    <Typography variant="body1">
                        643
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: theme.palette.text.secondary
                    }}>
                        readers
                    </Typography>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        p:1.5
                    }}
                >
                    <Typography variant="body1">
                        110
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: theme.palette.text.secondary
                    }}>
                        reviews
                    </Typography>
                </Box>
            </Box>
            
            <Typography variant="body2" sx={{
                textAlign: 'center',
                fontSize: 12,
                p:1
            }}>
                In the digital age, where information is abundant and access is key, BookshelfX emerges as a revolutionary 
                library management system designed to streamline the organization, retrieval, and dissemination of library resources. 
                This is the essence of modern library management—smart, simple, and swift.
            </Typography>

            <Button variant="contained" color="primary" sx={{mt:2}}>
                <Typography variant="body2">
                    Welcome Bibilophile!
                </Typography>
            </Button>
        </>
        }   
        </ThemeProvider>
    )
}