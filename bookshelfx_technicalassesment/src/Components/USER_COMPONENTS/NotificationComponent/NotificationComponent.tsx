import React from 'react';
import { Box, Button, CircularProgress, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
import { getActiveRentalsOfUser } from '@/Services/BookRoutines';
import Cookies from 'js-cookie';
import { BookRentalDetails } from '@/Components/interfaceModels';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { useRouter } from 'next/navigation';

export default function NotificationComponent({anchorEl, setAnchorEl}:
{   
    anchorEl: null | HTMLElement,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
})
{  
    const router = useRouter();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [Notifications, setNotifications] = React.useState<{notificationGroup: "renting"| "initiatedReturn"|"overdue"|null, notificationMessage: React.ReactNode, bookID: number|null}[]>();

    let userID: number | null = null;
    const userCookie = Cookies.get('user') ? Cookies.get('user') : undefined;
    if (userCookie !== undefined) 
    {
        userID = Number(JSON.parse(userCookie).id);
    }
    else
    {
        router.push('/');
    }

    const handleClick = (bookID: number) =>
    {
        router.push(`/Reader/book/${bookID}`);
        setAnchorEl(null);
    }

    React.useEffect(() =>{
        const fetchActiveRentalDataOfUser = async () =>
        { 
            const fetchActiveRentalDataOfUser = await getActiveRentalsOfUser(userID || 0);
            let notificationStrings :{notificationGroup: "renting"| "initiatedReturn"|"overdue"|null, notificationMessage: React.ReactNode, bookID: number}[] = [];
            if(fetchActiveRentalDataOfUser.success)
            {
                fetchActiveRentalDataOfUser.data.rentals.map((rental: BookRentalDetails) => {
                     let notificationMessage: React.ReactNode ;
                     let notificationGroup: "renting"| "initiatedReturn"|"overdue"|null = null;
                     let bookID = Number(rental.book.id);

                    if(new Date(rental.expectedReturnDate) < new Date())
                    {
                        notificationMessage =   <>  Your rental of {" "}
                                                    <Typography color="text.secondary" component="span">{rental.book.title}</Typography> {" "}
                                                    is overdue!, please return immediately
                                                </>;
                        notificationGroup = "overdue";
                    }
                    else if(rental.userInitiatedReturn)
                    {
                        notificationMessage =   <>You have initiated a return for {" "}
                                                    <Typography color="text.secondary" component="span" sx={{textDecoration:'underline'}}>{rental.book.title}</Typography>
                                                </>;
                        notificationGroup = "initiatedReturn";
                    }
                    else
                    {
                        notificationMessage =   <>You have rented {" "}
                                                    <Typography color="text.secondary" component="span">{rental.book.title}</Typography> {" "}
                                                    hope you are enjoying it!, please return it by {" "}
                                                    <Typography color="secondary" component="span">{new Date(rental.expectedReturnDate).toLocaleDateString()}</Typography>
                                                </>;
                        notificationGroup = "renting";
                    }
                    notificationStrings.push({notificationGroup, notificationMessage, bookID});
                }
                );
                setNotifications(notificationStrings);
            }
        };
        
        setLoading(true);
        fetchActiveRentalDataOfUser();
        setLoading(false);

    }, [anchorEl]);

    const handleClose = () =>
    {
        setAnchorEl(null);
    };

    return(
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {loading ? (
                <CircularProgress />
            ) : (
                 <>
                    {Notifications?.length === 0 ? (
                        <MenuItem>
                            No Notifications Found  
                        </MenuItem>
                    ) :
                    Notifications?.map((notification, index) => (
                        <>
                            <MenuItem key={index} onClick={() => handleClick(notification.bookID || 0)}>
                                {
                                    notification.notificationGroup === "overdue" ? (
                                        <GppMaybeIcon color="error" sx={{mr:1}}/>
                                    ) : notification.notificationGroup === "initiatedReturn" ? (
                                        <DownloadDoneIcon color="success" sx={{mr:1}}/>
                                    ) : (
                                        <MenuBookIcon color="primary" sx={{mr:1}}/>
                                    )
                                }
                                <Typography variant="body1">{notification.notificationMessage}</Typography>
                            </MenuItem>
                        </>
                    ))}
                 </>
            )}
        </Menu>
    );
}