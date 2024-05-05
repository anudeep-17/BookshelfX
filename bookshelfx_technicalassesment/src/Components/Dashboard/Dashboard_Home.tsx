'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import Navbar from '../Navbar/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import dynamic from 'next/dynamic';

const UserDashboardComponent = dynamic(() => import('@/Components/UserDashboardComponents/UserDashboardComponent'), { ssr: false });

import { DashboardSize } from '../DashboardSize';

const drawerWidth = DashboardSize;

export default function Dashboard_Home()
{
    return(
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
                    <UserDashboardComponent/>
                  </Box>
          </Box>
        </ThemeProvider>
    )
}
 