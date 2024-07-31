'use client';
import React from 'react';
import { Box, Avatar, Typography, Button, ThemeProvider, CssBaseline, Toolbar, Grid, CircularProgress, Snackbar, Alert, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DashboardSize } from "@/Components/DashboardSize";
import theme from '../Themes';
import { usePathname } from 'next/navigation';
const drawerWidth = DashboardSize;

export default function SettingsComponent()
{
    const pathname = usePathname();
    const user = pathname.split("/")[1];

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);



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
                             {user} Settings
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

                                    <Button variant="outlined" color="primary">
                                        Set New Password
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
        </Box>
        </ThemeProvider>
    );
}
