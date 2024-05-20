'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import Navbar from '../Navbar/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const UserDashboardComponent = dynamic(() => import('@/Components/USER_COMPONENTS/UserDashboardComponents/UserDashboardComponent'), { ssr: false });

import { DashboardSize } from '../DashboardSize';

const drawerWidth = DashboardSize;

export default function Dashboard_Home()
{
    return(
        <ThemeProvider theme={theme}>
          <motion.div
            initial={{ opacity: 0 }} // Set the initial state to 0
            animate={{ opacity: 1 }} // Animate to 1
            exit={{ opacity: 0 }} // Set the exit to 0
            transition={{  ease: "easeInOut",
                          duration: 1,
                          x: { duration: 1 } }} 
          >
            <Box sx={{ 
                      display: 'flex',
                      overflow: 'hidden',
                    }}>
                <CssBaseline />
                  <Box
                    component="main"
                    sx={{width: { sm: `calc(100% - ${drawerWidth}px)`}, marginLeft: { sm: `${drawerWidth}px` }, }}
                  >
                    <Toolbar />
                    <UserDashboardComponent/>
                  </Box>
          </Box>
          </motion.div>
        </ThemeProvider>
    )
}
 