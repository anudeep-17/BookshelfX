'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import { Button, CssBaseline, Divider, Drawer, InputAdornment, useMediaQuery } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {User} from "../interfaceModels"
import Cookies from 'js-cookie';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '@fontsource/caveat-brush';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { DashboardSize } from '../DashboardSize';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import FlagIcon from '@mui/icons-material/Flag';
import TextField from '@mui/material/TextField';

const drawerWidth = DashboardSize;

export default function Navbar()
{
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const pathname = usePathname();

    const user: User | null = Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : null;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(false);
    
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      Cookies.remove('user');
      router.push('/');
    }

    

    const Search = styled(Box)(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled(Box)(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));

      const UserDrawer = [
        {
          text: 'Discover',
          path: '/home',
          icon: <HomeIcon/>,
        },
        {
          text: 'Featured Books',
          path: '/featuredbooks',
          icon: <FlagIcon />,
        },
        {
          text: 'All Categories',
          path: '/allcategory',
          icon: <CategoryIcon />,
        },
        {
          text: 'All Books',
          path: '/allbooks',
          icon: <MenuBookIcon/>,
        },
        {
          text: 'My Favourites',
          path: '/favourites',
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
  
      const drawer = (
        <ThemeProvider theme={theme}>
          <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {
            isXs? <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleDrawerClose }>
                <ArrowLeftIcon sx={{
                  fontSize:'2rem' 
                }}/>
                <Typography variant="body1">Close</Typography>
              </IconButton>
            </Toolbar>: null
            }
          <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h5" sx={{ color: theme => theme.palette.text.primary }} component="span">
              Bookshelf
            </Typography>
            <Typography variant="h5" sx={{ color: theme => theme.palette.text.secondary }} component="span">
              X
            </Typography>
            
          </Toolbar>
            <List>
              {UserDrawer.slice(0, 5).map((item, index) => (
                <ListItem key={item.text} disablePadding>
                <ListItemButton 
                selected={pathname === item.path}
                sx={{ 
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
                }}
                onClick={() => item.path && router.push(item.path)}
                >
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
              {UserDrawer.slice(5).map((item, index) => (
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

      const [searchInput, setSearchInput] = React.useState('');
     
    
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                  width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
                  ml: { xs: '0px', sm: `calc(${drawerWidth}px)` },
                }}
            >
            <Toolbar>
              {isXs?<IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>:null}

               
            <TextField
              placeholder="Search…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              sx={{
                color: 'inherit',
                width: '20%',
                transition: 'width 0.35s ease-in-out',
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
                borderRadius: '4px', // Add this line to make the borders curved
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
                },
                '&:focus-within': {
                  width: '40%',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent', // Change this line to remove the border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent', // Change this line to remove the border color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent', // Change this line to remove the border color
                  },
                },
                '& .MuiInputBase-input': {
                  padding: (theme) => theme.spacing(1, 1, 1, 0),
                  paddingLeft: (theme) => `calc(${theme.spacing(2)}px + 1em)`, // Modify this line to adjust the placeholder position
                  transition: (theme) => theme.transitions.create('width'),
                  [theme.breakpoints.up('sm')]: {
                    width: '12ch',
                    '&:focus': {
                      width: '20ch',
                    },
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
     
              <Box sx={{ flexGrow: 1 }} />
              
              <IconButton color="inherit" sx={{
                ml: { xs: 2, sm: 0 },
              }}>
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon 
                    sx={{ 
                      
                      borderRadius: '50%', // Make it circular
                      transition: 'background-color 0.3s', // Smooth transition
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                      },
                    }}
                  />
                </Badge>
              </IconButton>

              <Button 
                variant="text"
                sx={{ 
                  ml: { xs: 0, sm: 'auto' }, 
                  color:'white',
                  fontFamily: "'Caveat Brush', cursive",
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  },
                  m:1
                }}
                onClick={handleClick}
              >
                <Typography 
                  variant="body2" 
                  noWrap 
                  component="div" 
                  letterSpacing={3} 
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center', // Center items horizontally
                    alignItems: 'center', // Center items vertically
                    fontFamily: "'Caveat Brush', cursive",
                    fontSize: '1.5rem',
                    fontWeight: '400'
                  }}
                >
                   {user 
                      ? (isXs 
                        ? user.name.charAt(0).toUpperCase() 
                        : (user.name.length > 7 
                          ? user.name.charAt(0).toUpperCase() + user.name.slice(1, 7).toLowerCase() + "..." 
                          : user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase())
                        ) 
                      : (isXs? "G" :" Guest")
                    }
                  <ArrowDropDownIcon sx={{
                    fontSize: { xs: '1rem', sm: '1.5rem' },
                    ml: 0.5
                  }}/>
                </Typography>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>

            </Toolbar>
            </AppBar>

            <Drawer
              sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                      width: drawerWidth,
                      boxSizing: 'border-box',
                  },
              }}
              variant={isXs ? 'temporary' : 'persistent'}
              anchor="left"
              open={isXs? open: !isXs}
              disableEnforceFocus
              disableAutoFocus
            >
              {drawer}
            </Drawer>

      </ThemeProvider>
    );
}

