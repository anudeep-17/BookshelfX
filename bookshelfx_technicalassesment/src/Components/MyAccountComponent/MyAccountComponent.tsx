'use client'
import React from 'react';
import { Box, Avatar, Typography, Button, ThemeProvider, CssBaseline, Toolbar, Grid } from '@mui/material';
import { DashboardSize } from "@/Components/DashboardSize";
import theme from '../Themes';
import Cookies from 'js-cookie';
import { User } from '../interfaceModels';
const drawerWidth = DashboardSize;

export default function MyAccountComponent() 
{
    const userCookie = Cookies.get('user');
    const user : User = userCookie ? JSON.parse(userCookie) : null;
    console.log(user);
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
                            <Typography variant="h4" gutterBottom textAlign={'center'} sx={{mt:1}}>
                                    My Account Details
                            </Typography>      
                         
                                {
                                    user ?
                                    <Grid container spacing={4}   justifyContent="center"   sx={{
                                        p:2,
                                        mt:2
                                    }}>
                                        <Grid item xs={12} sm={4}>
                                            <Avatar sx={{ width: 200, height: 200, mb: 2 }} src={user.Avatar}/>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Typography variant="h5" gutterBottom>
                                                Username: {user.name}
                                            </Typography>
                                            <Typography variant="h6" gutterBottom>
                                                UserEmail: {user.email}
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                Favourite Categories : {user.favoriteCategories?.join(", ")}
                                            </Typography>
                                            <Button variant="contained" color="primary">
                                                Edit Account
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Typography variant="h6" gutterBottom>
                                        No user found
                                    </Typography>
                                }

                        </Box>
            </Box>
        </ThemeProvider>
    );
}

 