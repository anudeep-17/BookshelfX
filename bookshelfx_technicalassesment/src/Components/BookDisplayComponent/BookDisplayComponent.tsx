'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import Navbar from '../Navbar/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import dynamic from 'next/dynamic';

import { DashboardSize } from '../DashboardSize';
const drawerWidth = DashboardSize;

const BookList = dynamic(() => import('@/Components/BookList/Booklist'), { ssr: false });

export default function BookDisplayComponent() {
    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ 
                  display: 'flex',
                }}>
            <CssBaseline />
            <Navbar/>
              <Box
                component="main"
                sx={{width: { sm: `calc(100% - ${drawerWidth}px)`} }}
              >
                <Toolbar />
                <BookList/>
              </Box>
        </Box>
        </ThemeProvider>
    )
}