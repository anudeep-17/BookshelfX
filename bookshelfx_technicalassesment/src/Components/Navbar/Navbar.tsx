'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Button, CssBaseline } from '@mui/material';
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


const drawerWidth = 200;

export default function Navbar()
{
    const user: User | null = Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : null;
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const options = {
      "Profile": 0,
      "Logout": 1,
    }
    
    const Search = styled('div')(({ theme }) => ({
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
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
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



    console.log(user ? user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase() : "Guest");
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `calc(${drawerWidth}px)` },
                }}
            >
            <Toolbar>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              
              <Box sx={{ flexGrow: 1 }} />
              
              <IconButton color="inherit">
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
                  ml: 'auto', 
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
                  variant="h6" 
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
                  {user ? user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase() : "Guest"}
                  <ArrowDropDownIcon sx={{
                    fontSize: '1.5rem',
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
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>

            </Toolbar>
            </AppBar>
      </ThemeProvider>
    );
}

