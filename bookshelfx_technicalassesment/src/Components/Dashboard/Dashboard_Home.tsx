'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import {Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { Book } from '../interfaceModels';
import { motion } from "framer-motion"
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import UserDashboardComponent from '@/Components/UserDashboardComponents/UserDashboardComponent'
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 210;

interface Props {
    window?: () => Window;
  }

export default function Dashboard_Home(props: Props)
{
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const UserDrawer = [
        {
          text: 'Discover',
          icon: <HomeIcon/>,
        },
        {
          text: 'Category',
          icon: <CategoryIcon />,
        },
        {
          text: 'My Library',
          icon: <MenuBookIcon/>,
        },
        {
          text: 'Favourites',
          icon: <FavoriteBorderIcon />,
        },
        {
          text: 'Settings',
          icon: <SettingsIcon/>
        },
        {
          text: 'Logout',
          icon: <LogoutIcon/>
        }
    ]
  
    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };
  
    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };
  
    const handleDrawerToggle = () => {
      if (!isClosing) {
        setMobileOpen(!mobileOpen);
      }
    };
  
    const drawer = (
      <ThemeProvider theme={theme}>
        <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ color: theme => theme.palette.text.primary }} component="span">
            Bookshelf
          </Typography>
          <Typography variant="h5" sx={{ color: theme => theme.palette.text.secondary }} component="span">
            X
          </Typography>
        </Toolbar>
          <List>
            {UserDrawer.slice(0, 4).map((item, index) => (
              <ListItem key={item.text} disablePadding>
              <ListItemButton sx={{ 
                borderRadius: '4px', // Make edges curved
                m:2,
                '&:hover': {
                  backgroundColor: 'transparent',
                  '& .MuiSvgIcon-root': {
                    color: '#3f51b5',
                  },
                  '& .MuiListItemText-root': {
                    fontWeight: 'bold',
                  },
                },
                '&.Mui-selected': {
                  '& .MuiListItemText-root': {
                    fontWeight: 'bold',
                  },
                },
              }}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider variant="middle" />
          
          <List>
            {UserDrawer.slice(4).map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton sx={{ 
                  borderRadius: '4px', // Make edges curved
                  m:2,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '& .MuiSvgIcon-root': {
                      color: '#3f51b5',
                    },
                    '& .MuiListItemText-root': {
                      fontWeight: 'bold',
                    },
                  },
                  '&.Mui-selected': {
                    '& .MuiListItemText-root': {
                      fontWeight: 'bold',
                    },
                  },
                }}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        </ThemeProvider>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return(
        <ThemeProvider theme={theme}>
            {/* <motion.div
                initial={{y:20, opacity:0}}
                animate={{y:0, opacity:1}}
                transition={{ease: 'easeInOut', duration:0.3}}
            > */}
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Navbar/>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}

                >
                <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                {drawer}
                </Drawer>
                <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
                >
                {drawer}
                </Drawer>
            </Box>
            <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
              <Toolbar />
              <UserDashboardComponent/>
            </Box>
          </Box>
            {/* </motion.div> */}
        </ThemeProvider>
    )
}
 