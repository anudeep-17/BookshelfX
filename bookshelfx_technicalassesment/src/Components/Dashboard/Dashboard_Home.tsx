'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import {IconButton, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import UserDashboardComponent from '@/Components/UserDashboardComponents/UserDashboardComponent'
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
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
 