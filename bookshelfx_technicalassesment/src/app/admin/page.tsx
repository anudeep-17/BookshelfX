'use client';
import React from 'react';
import { Box, Avatar, Typography, Button, ThemeProvider, CssBaseline, Toolbar, Grid, CircularProgress, Snackbar, Alert, TextField } from '@mui/material';
import theme from '@/Components/Themes';
import Cookies from 'js-cookie';

export default function Home() 
{
    const [loading, setLoading] = React.useState<boolean>(false);
    const [password , setPassword] = React.useState<string>('');

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/DeleteAll', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            if (data.success) {
                console.log('All data deleted successfully');
            } else {
                console.error('An unexpected error happened:', data.message);
            }
        } catch (error) {
            console.error('An unexpected error happened:', error);
        }
        setLoading(false);
    }

    return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Toolbar />
    <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                   
                    <Typography variant="h3" sx={{ mb: 2 }}>
                       WildCard Route to Delete All Data of the Application
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Please enter the password to continue
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={async ()=>{
                        if(password === 'BookShelfXDeleteAll')
                        {
                            setLoading(true);
                            await handleDelete();
                            setPassword('');
                            Cookies.remove('user');
                            alert('All Data Deleted Successfully');
                            setLoading(false);
                        }
                        else
                        {
                            alert('Incorrect Password');
                        }
                    }}>
                        Continue
                    </Button>
                    {loading && <CircularProgress />}
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
  );
}