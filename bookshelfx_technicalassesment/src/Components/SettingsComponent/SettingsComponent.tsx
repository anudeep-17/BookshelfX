'use client';
import React from 'react';
import { Box, Avatar, Typography, Button, ThemeProvider, CssBaseline, Toolbar, Grid, CircularProgress, Snackbar, Alert, TextField, InputAdornment, IconButton, Divider, Chip } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DashboardSize } from "@/Components/DashboardSize";
import theme from '../Themes';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { getCategories } from '@/Services/BookRoutines';
import { User } from '../interfaceModels';
import { GetUser, UpdateUserFavoriteCategories, UpdateUserPassword } from '@/Services/UserRoutines';
const drawerWidth = DashboardSize;

export default function SettingsComponent()
{
    const pathname = usePathname();
    const user = pathname.split("/")[1];

    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [passwordUpdateLoading, setPasswordUpdateLoading] = React.useState<boolean>(false);

    const [AllCategories, setAllCategories] = React.useState<string[]>([]);
    const [userSelectedCategories, setUserSelectedCategories] = React.useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [CategoriesUpdateLoading, setCategoriesUpdateLoading] = React.useState<boolean>(false);

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertContent, setAlertContent] = React.useState<{ severity: "success" | "error" | "info" | "warning" | undefined, message: string }>({
        severity: 'success', message: ''
    });

    React.useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            if(response.success)
            {
                console.log(response.data);
                setAllCategories(response.data);
            }
         
        }
        setLoading(true);
        fetchCategories();
        setLoading(false);
    }, []);

    const userCookie = Cookies.get('user');
    const userDetails : User = userCookie ? JSON.parse(userCookie) : null;
    React.useEffect(() => {
        const fetchData = async () => {
            if(userDetails)
            {
                const response = await GetUser({id: Number(userDetails.id)});
                if(response.success)
                {
                    setUserSelectedCategories(response.data.favoriteCategories);
                    setSelectedCategories(response.data.favoriteCategories);
                }
            }
        }
        fetchData();
    },[ userCookie ]);

    const handleCloseAlert = (event: React.SyntheticEvent<any, Event> | Event, reason?: string) => {
        if (reason === 'clickaway') 
        {
          return;
        }
        setAlertOpen(false);
    };
    
    const handlePasswordChange = async () => 
    {
        setPasswordUpdateLoading(true);
        try {
            if(password === confirmPassword)
            {
                const response = await UpdateUserPassword({id: Number(userDetails.id), password});
                if(response.success)
                {
                    setAlertOpen(true);
                    setAlertContent({
                        severity: 'success',
                        message: response.message
                    });
                }
                else
                {
                    setAlertOpen(true);
                    setAlertContent({
                        severity: 'error',
                        message: response.message
                    });
                }
            }
            else
            {
                setAlertOpen(true);
                setAlertContent({
                    severity: 'error',
                    message: 'Passwords do not match'
                });
            }
        } catch (error) {
            setAlertOpen(true);
            setAlertContent({
                severity: 'error',
                message: 'An error occurred while updating the password'
            });
        } finally {
            setPasswordUpdateLoading(false);
        }
    }

    const handleCategoryChange = async () => 
    {
        setCategoriesUpdateLoading(true);
        try {
            if(selectedCategories.length > 6)
            {
                setAlertOpen(true);
                setAlertContent({
                    severity: 'error',
                    message: 'You can only select upto 6 categories'
                });
            }
            else
            {
                const response = await UpdateUserFavoriteCategories({id: Number(userDetails.id), favoriteCategories: selectedCategories});
                if(response.success)
                {
                    Cookies.set('user', JSON.stringify({...userDetails, favoriteCategories: selectedCategories}));
                    setAlertOpen(true);
                    setAlertContent({
                        severity: 'success',
                        message: response.message
                    });
                }
                else
                {
                    setAlertOpen(true);
                    setAlertContent({
                        severity: 'error',
                        message: response.message
                    });
                }
            }
        } catch (error) {
            setAlertOpen(true);
            setAlertContent({
                severity: 'error',
                message: 'An error occurred while updating categories'
            });
        } finally {
            setCategoriesUpdateLoading(false);
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
                        <Typography variant="h3" gutterBottom textAlign={'center'} sx={{mt:2}}>
                             {user} <span style={{color: theme.palette.text.secondary}}>Settings</span>
                        </Typography>
                        
                        <Grid container spacing={2} sx={{mt:2, p:1}}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h2" gutterBottom sx={{
                                    color: theme.palette.primary.main
                                }}>
                                    Set a new <br/> 
                                    Password: 
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box 
                                   sx={{
                                        display:'flex', 
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        gap:3
                                    }}
                                >
                                    <TextField
                                        type={showPassword ? 'text' : 'password'}
                                        label="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    
                                    <TextField
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        label="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        error={password !== confirmPassword && password.length > 0 && confirmPassword.length > 0}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {
                                        passwordUpdateLoading ? 
                                        <CircularProgress sx={{
                                            alignSelf: 'center'
                                        }} />
                                        :
                                        <Button variant="outlined" color="primary" onClick={handlePasswordChange} disabled={password !== confirmPassword || ( password.length === 0 && confirmPassword.length === 0)}>
                                            Set New Password
                                        </Button>
                                    }
                                   
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12} sm={12}>
                                <Divider 
                                    sx={{
                                        m:2,
                                        p:2
                                    }}
                                />
                            </Grid>
                            {
                                userCookie && userDetails && userDetails.role === 'librarian' ? 
                                null:
                                <>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h2" gutterBottom sx={{
                                        color: theme.palette.primary.main
                                    }}>
                                        Favourite <br/>
                                        Categories: 
                                    </Typography>
                                    <Typography variant="body2" gutterBottom sx={{
                                        color: theme.palette.text.secondary,
                                        textDecoration: 'underline',
                                    }}>
                                        * Select your favourite categories upto 6 categories
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box 
                                    sx={{
                                            display:'flex', 
                                            flexDirection: 'column',
                                            alignContent: 'center',
                                            gap:3
                                        }}
                                    >
                                        {
                                            loading?
                                            <CircularProgress sx={{
                                                alignSelf: 'center'
                                            }} />
                                            :
                                            <Grid container spacing={1}>
                                                {AllCategories.map((category, index) => (
                                                <Grid item xs={6} key={index}>
                                                    <Chip
                                                        sx={{cursor: 'pointer', width: '100%'}}
                                                        label={category}
                                                        color={selectedCategories.includes(category) ? 'primary' : 'default'}
                                                        onClick={() => {
                                                            if(selectedCategories.includes(category)) {
                                                            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
                                                            } else {
                                                            // Only add the category if there are less than 6 selected categories
                                                            if (selectedCategories.length < 6) {
                                                                setSelectedCategories([...selectedCategories, category]);
                                                            } else {
                                                                // Set the alert open and content if there are already 6 selected categories
                                                                setAlertOpen(true);
                                                                setAlertContent({
                                                                severity: 'warning',
                                                                message: 'You have already selected 6 categories.'
                                                                });
                                                            }
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                ))}
                                        </Grid>
                                        }

                                        {
                                            CategoriesUpdateLoading ? 
                                            <CircularProgress sx={{
                                                alignSelf: 'center'
                                            }} />
                                            :
                                            <Button variant="outlined" color="primary" disabled = {selectedCategories === userSelectedCategories} onClick={handleCategoryChange}>
                                                Set new Categories
                                            </Button>
                                        }
                                    </Box>
                                </Grid>
                                </>
                            }
                           
                        </Grid>
                    </Box>
        </Box>

        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={alertContent.severity}>
                {alertContent.message}
            </Alert>
        </Snackbar>

        </ThemeProvider>
    );
}
