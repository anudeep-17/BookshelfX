'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login()
{
    return(
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                flexDirection: ['column', 'column'], // column layout for small screens, row layout for larger screens
            }}>
                <Typography variant="h4" letterSpacing={2}>
                    Login
                </Typography>
                <Typography variant="body2" letterSpacing={0} sx={{mt:1}}>
                    Welcome back to BookshelfX! Please enter your details to login.
                </Typography>

                <Box component="form" noValidate autoComplete="off" 
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt:4, // remove margin
                    padding: 0, // remove padding
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    width: '100%',
                    height: '100%',
                    overflowX: 'hidden', // disable horizontal scrolling
                    overflowY: 'hidden', // disable vertical scrolling
                }}>
                  <TextField
                    required
                    id="standard-required"
                    label="Email"
                    variant="standard"
                    sx={{mb:2}}
                    />  
                    <TextField
                    required
                    id="standard-required"
                    label="Pasword"
                    variant="standard"
                    type='password'
                    sx={{mb:2}}
                    />  
                    <Button variant='contained' sx={{
                        width: '100%',
                        mt:2,
                        mb:2
                    }}>
                        Login
                    </Button>
                    <Button variant='outlined' sx={{
                        width: '100%',
                        mb:2
                    }}>
                        Register
                    </Button>
                    
                </Box>

            </Box>
        </ThemeProvider>
    )
}