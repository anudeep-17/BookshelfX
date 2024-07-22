import * as React from 'react';
import { Box, CssBaseline, Rating, ThemeProvider, Tooltip } from '@mui/material';
import theme from '../../Themes';
import { ImageCardProps } from '../../interfaceModels';
import bookcover from '@/assets/bookcover.png';
import Cookies from 'js-cookie';
import { isbookrentedbycurrentuser } from '@/Services/BookRoutines';


export default function ImageCard({bookID, image, rating, title, availability, onMouseEnter, onClick}: ImageCardProps) 
{
    const [isRentedBytheSameUser, setIsRentedBytheSameUser] = React.useState<boolean>(false);   
    let userID: number | null = null;
    const userCookie = Cookies.get('user');
    if (userCookie !== undefined) {
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
            <CssBaseline />
            <Tooltip title={isRentedBytheSameUser ? "Already Rented" : (!availability ? "Not Available" : null)} followCursor>
            <Box sx={{ 
                minHeight: 180,
                minWidth: 120,
                backgroundImage: `url(${image === 'N/A'? bookcover.src : image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mb:2,
                transition: 'transform .3s',  
                position: 'relative', // Add this
                ':hover': {
                    transform: 'translateY(-8px)', // Elevate the card on hover
                    boxShadow: '0 3px 10px #3f51b5',
                    borderRadius: '10px 10px 10px 10px',
                    cursor: 'pointer',
                },
                ':hover div': { // Add this
                    opacity: 1,
                    boxShadow: '0 3px 10px #3f51b5',
                    borderRadius: '10px 10px 10px 10px',
                    cursor: 'pointer',
                },
            }}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
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
            </Tooltip>
        </ThemeProvider>
    )
}