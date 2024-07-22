import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, ThemeProvider, Tooltip } from '@mui/material';
import theme from '../../Themes';
import { BookCardProps } from '../../interfaceModels';
import BookCover from '@/assets/bookcover.png'
import Cookies from 'js-cookie';
import { isbookrentedbycurrentuser } from '@/Services/BookRoutines';

export default function BookCard({bookID, coverimage, title, rating, authors, availability, onMouseEnter, onClick}: BookCardProps) {
    
    const [isRentedBytheSameUser, setIsRentedBytheSameUser] = React.useState<boolean>(false);   
    let userID: number | null = null;
    const userCookie = Cookies.get('user');
    if (userCookie !== undefined) 
    {
        userID = Number(JSON.parse(userCookie).id);
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const response =  await isbookrentedbycurrentuser(bookID || 0, userID || 0);  
            setIsRentedBytheSameUser(response.success);
        }
        fetchData();
    }, []);

    return(
        <ThemeProvider theme={theme}>
        <Tooltip title={isRentedBytheSameUser ? "Already Rented" : (!availability ? "Not Available" : null)} followCursor>
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
                    boxShadow: '0 3px 10px #3f51b5',
                    borderRadius: '10px 10px 10px 10px',
                    cursor: 'pointer',
                },
                borderRadius: '10px 10px 10px 10px',
                backgroundColor: availability ? 'initial' : '#cccccc',
            }}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            >
                <Box sx={{ 
                    height: 230, // Increased size
                    backgroundImage: `url(${coverimage === 'N/A'? BookCover.src : coverimage})`, // Add image
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
            </Tooltip>
        </ThemeProvider>
    );
}
 