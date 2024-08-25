'use client'
import React from 'react';
import { Box, Avatar, Typography, Button, ThemeProvider, CssBaseline, Toolbar, Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import { DashboardSize } from "@/Components/DashboardSize";
import theme from '../Themes';
import Cookies from 'js-cookie';
import { User } from '../interfaceModels';
import { DeleteAccount, GetUser } from '@/Services/UserRoutines';
import DeleteDialog from './DeleteDialog';
import { usePathname, useRouter } from 'next/navigation';
const drawerWidth = DashboardSize;

export default function MyAccountComponent() 
{
    const pathname = usePathname();
    const router = useRouter();

    const [loading, setLoading] = React.useState<boolean>(false);

    const userCookie = Cookies.get('user');
    const user : User = userCookie ? JSON.parse(userCookie) : null;
    const [User, setUser] = React.useState<User | null>(user);

    const [DeleteAccountDialog, setDeleteAccountDialog] = React.useState<boolean>(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertContent, setAlertContent] = React.useState<{ severity: "success" | "error" | "info" | "warning" | undefined, message: string }>({
        severity: 'success', message: ''
    });

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await GetUser({id: Number(user.id) || 0});
            if(response.success)
            {
                console.log(response.data);
                setUser(response.data);
            }
        };
        setLoading(true);
        fetchData();
        setLoading(false);
    }
    , []);

    const handleCloseAlert = (event: React.SyntheticEvent<any, Event> | Event, reason?: string) => {
        if (reason === 'clickaway') 
        {
          return;
        }
        setAlertOpen(false);
    };
    
    const handleDeleteAccount = async () => {
        const response = await DeleteAccount({id: Number(user.id) || 0});
        if(response.success)
        {
            setAlertContent({severity: 'success', message: response.message});
            setAlertOpen(true);
            Cookies.remove('user');
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
        else
        {
            setAlertContent({severity: 'error', message: response.message});
            setAlertOpen(true);
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />  
            <Box sx={{ 
                    display: 'flex',
                    }}>
                        <Box
                            component="main"
                            sx={{width: { sm: `calc(100% - ${drawerWidth}px)`}, marginLeft: { sm: `${drawerWidth}px` }, }}
                        >
                            <Toolbar />   
                            <Typography variant="h4" gutterBottom textAlign={'center'} sx={{mt:2}}>
                                 Hello  <span style={{ color: theme.palette.text.secondary }}>Bibliophile</span>, Welcome to your account
                            </Typography>      
                         
                            {
                                loading?
                                <CircularProgress />
                                :
                                <Grid container spacing={2} sx={{mt:1, p:1}}>
                                    <Grid item xs={12} sm={6}>
                                        <Avatar alt={User?.name} src={User?.Avatar} sx={{ width: 350, height: 350, mx: "auto" }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6" gutterBottom>
                                            <span style={{ color: theme.palette.text.secondary }}>Name:</span> {User?.name}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            <span style={{color: theme.palette.text.secondary}}>Email:</span> {User?.email}
                                        </Typography>
                                        {
                                            pathname.split("/")[1] === 'librarian' ?
                                            <>
                                                <Typography variant="h6" gutterBottom>
                                                    <span style={{ color: theme.palette.text.secondary }}>Authorized Rental Closures:</span> {User?.authorizedRentals?.length} Books
                                                </Typography>
                                                <Button variant="outlined"   color="secondary" sx={{mt:2, width: '70%'}} onClick={()=>{
                                                    router.push('/librarian/home');
                                                }}>
                                                    Go to Librarian Dashboard
                                                </Button>
                                            </>
                                            :
                                            <>
                                                <Typography variant="h6" gutterBottom>
                                                    <span style={{ color: theme.palette.text.secondary }}>Number of Favorite Books:</span> {User?.favouriteBooks?.length || 0} Books
                                                </Typography>
                                                <Typography variant="h6" gutterBottom>
                                                    <span style={{ color: theme.palette.text.secondary }}>Number of Rentals:</span> {User?.rentals?.length} books
                                                </Typography>
                                                <Typography variant="h6" gutterBottom>
                                                    <span style={{ color: theme.palette.text.secondary }}>Number of Reviews:</span> {User?.reviews?.length} books
                                                </Typography>

                                                <Typography variant="body1" gutterBottom>
                                                    <span style={{ color: theme.palette.text.secondary }}>Favorite Categories:</span>  {user?.favoriteCategories ? user.favoriteCategories.join(", ") : "No Favorite Categories"}
                                                </Typography>

                                                <Button variant="outlined"   color="secondary" sx={{mt:2, width: '70%'}} onClick={()=>{
                                                    setDeleteAccountDialog(true);
                                                }}>
                                                    Delete Account
                                                </Button>
                                            </>
                                        }
                                      
                                    </Grid>

                                </Grid>
                            }
                        </Box>

                {
                    DeleteAccountDialog && <DeleteDialog openDialog={DeleteAccountDialog} handleDeleteAccount={handleDeleteAccount} setOpenDialog={setDeleteAccountDialog} />
                }
                <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alertContent.severity}>
                        {alertContent.message}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
}

 