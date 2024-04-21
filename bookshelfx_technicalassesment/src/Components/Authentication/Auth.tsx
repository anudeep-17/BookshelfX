'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import Image from 'next/image';
import Login_image from "../../assets/Login_image.jpg"
import Login from './Login';
 
 
export default function Auth()
{
    return(
        <ThemeProvider theme={theme}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: ['column', 'row'], // column layout for small screens, row layout for larger screens
                    width: '100%',
                    height: '100%',
                    overflowX: 'hidden', // disable horizontal scrolling
                    overflowY: 'hidden', // disable vertical scrolling
                    margin: 0, // remove margin
                    padding: 0, // remove padding
                }}>
                    <Box sx={{
                            position: 'relative', // make this box positioned
                            width: ['100%', '50%'], // full width on small screens, half width on larger screens
                            minHeight: ['25vh','98vh'], 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            margin: 0, // remove margin
                            padding: 0, // remove padding
                    }}>
                        <Image src={Login_image.src} alt="logo" layout="fill" objectFit="cover"/>
                    </Box>

                    <Box sx={{
                    width: ['100%', '50%'], // full width on small screens, half width on larger screens
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    flexDirection: ['column', 'row'], // column layout for small screens, row layout for larger screens
                    }}>
                        <Login />
                    </Box>
                </Box>
        </ThemeProvider>
        )
    }
