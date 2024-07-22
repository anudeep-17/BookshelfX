'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import { Alert, Avatar, Button, CssBaseline, Divider, Drawer, Icon, InputAdornment, useMediaQuery } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation'
import FlagIcon from '@mui/icons-material/Flag';
import TextField from '@mui/material/TextField';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { SearchContext } from '../Context/SearchContext';
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';


const drawerWidth = DashboardSize;

export default function Navbar()
{
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const user: User | null = Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : null;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(false);
    const [AlertOpen, setAlertOpen] = React.useState(false);
    const [alertInfo, setAlertInfo] = React.useState<{severity: 'warning' | 'error', message: string}>({severity: 'warning', message: ""});

    const handleAlertClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setAlertOpen(false);
    };

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

    const UserDrawer = [
      {
        text: 'Discover',
        path: '/Reader/home',
        icon: <HomeIcon/>,
      },
      {
        text: 'Featured Books',
        path: '/Reader/featuredbooks',
        icon: <FlagIcon />,
      },
      {
        text: 'All Categories',
        path: '/Reader/allcategory',
        icon: <CategoryIcon />,
      },
      {
        text: 'All Books',
        path: '/Reader/allbooks',
        icon: <MenuBookIcon/>,
      },
      {
        text: 'My Favourites',
        path: '/Reader/favourites',
        icon: <FavoriteBorderIcon />,
      },
      {
        text: 'My Rentals',
        path: '/Reader/myrentals',
        icon:  <AutoStoriesIcon/>,
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

  const LibrarianDrawer = [
    {
      text: 'DashBoard',
      path: '/librarian/home',
      icon: <HomeIcon/>,
    },
    {
      text: 'Add Books',
      path: '/librarian/addBook',
      icon: <AddIcon />,
    },
    {
      text: 'Delete Books',
      path: '/librarian/deleteBook',
      icon: <DeleteIcon />,
    },
    {
      text: 'Edit Books',
      path: '/librarian/editBook',
      icon: <EditIcon/>,
    },
    {
      text: 'All Books',
      path: '/librarian/allBooks',
      icon: <FavoriteBorderIcon />,
    },
    {
      text: 'User Rental Details',
      path: '/librarian/closeuserrentals',
      icon:  <DoDisturbAltIcon/>,
    },
    {
      text: 'Settings',
      icon: <SettingsIcon/>
    },
    {
      text: 'Logout',
      icon: <LogoutIcon/>
    }
  ];
  
      const drawer = (
        <ThemeProvider theme={theme}>
          <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {
            isXs? <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleDrawerClose}>
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
              {(pathname.split("/")[1] === 'Reader'? UserDrawer : LibrarianDrawer).slice(0, 6).map((item, index) => (
                <ListItem key={item.text} disablePadding>
                <ListItemButton 
                selected={pathname.startsWith(item.path? item.path : "")}
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
              {(pathname.split("/")[1] === 'Reader'? UserDrawer : LibrarianDrawer).slice(6).map((item, index) => (
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

      const {searchInput, setSearchInput} = React.useContext(SearchContext); 

      React.useEffect(() => {
        if(searchParams.has('title') || searchParams.has('author') || searchParams.has('category') || searchParams.has('publisher')) //as atleast title is required for search
        {
          let tempSearchInput = '';
          searchParams.forEach((value, key) => {
            tempSearchInput += `/${key}: ${value}`+" ";
          });  
          setSearchInput(tempSearchInput);
        }
      }, [searchParams]);

      const [searchanchorEl , setSearchAnchorEl] = React.useState<null | HTMLElement>(null);
      const handleSearchClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setSearchAnchorEl(event.currentTarget);
        setAlertOpen(true);
        setAlertInfo({severity: 'warning', message: 'If sorting By authors, please add , after each author name'});
      };
      
      const handleSearchOptions = (searchOption: string) => {
        const regex = /\/(title|author|category|publisher): .+$/;
        if(regex.test(searchInput))
        {
          setSearchInput(searchInput + " " + searchOption);
        }
        else
        {
          setSearchInput(searchOption);
        }
      };

      const handleSearchSubmit = () => {
        if(searchInput.length > 0)
        {
          const queryParams = searchInput.split('/').filter(Boolean).map(item => {
            const [key, value] = item.split(':');
            return `${key}=${encodeURIComponent(value.trim())}`;
          }).join('&');
          router.push(`/Reader/searchresult?${queryParams}`);
        }
      }
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
              onClick={(event) => {if(searchInput === ''){handleSearchClick(event)}}}
              onKeyDown={(e) => {if(e.key === 'Enter'){handleSearchSubmit()}}}
              sx={{
                color: 'inherit',
                width: searchInput ? '50%' : '20%',
                transition: 'width 0.35s ease-in-out',
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
                borderRadius: '4px', // Add this line to make the borders curved
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
                },
                '&:focus-within': {
                  width: '50%',
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
                  color: 'white',
                  padding: (theme) => theme.spacing(1, 1, 1, 0),
                  paddingLeft: (theme) => `calc(${theme.spacing(2)}px + 1em)`, // Modify this line to adjust the placeholder position
                  transition: (theme) => theme.transitions.create('width'),
                  [theme.breakpoints.up('sm')]: {
                    width: searchInput? '100ch': '12ch',
                    '&:focus': {
                      width: '100ch',
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
                endAdornment: (
                  <InputAdornment position="end">
                    {searchInput.length > 0?
                    <>
                      <IconButton onClick={handleSearchClick}>
                        <ArrowDropDownCircleIcon />
                      </IconButton>
                      <IconButton onClick={handleSearchSubmit}>
                        <SendIcon />
                      </IconButton>
                    </>
                      
                      :
                      null
                    }
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

            <Menu
              anchorEl={searchanchorEl}
              open={Boolean(searchanchorEl)}
              onClose={() => setSearchAnchorEl(null)}
            >
              <MenuItem 
                onClick={() => {handleSearchOptions("/title: "); setSearchAnchorEl(null);}}
                disabled={searchInput.includes("/title: ")}
              >
                Search by title
              </MenuItem>
              <MenuItem 
                onClick={() => {handleSearchOptions("/author: "); setSearchAnchorEl(null);}}
                disabled={searchInput.includes("/author: ")}
              >
                Search by author
              </MenuItem>
              <MenuItem 
                onClick={() => {handleSearchOptions("/category: "); setSearchAnchorEl(null);}}
                disabled={searchInput.includes("/category: ")}
              >
                Search by category
              </MenuItem>
              <MenuItem 
                onClick={() => {handleSearchOptions("/publisher: "); setSearchAnchorEl(null);}}
                disabled={searchInput.includes("/publisher: ")}
              >
                Search by publisher
              </MenuItem>
            </Menu>

     
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
                 
                   {
                      user? <Avatar alt={user.name} src={user.Avatar} sx={{ width: 30, height: 30, mr: 0.5 }} />: null
                   }
                  <ArrowDropDownIcon sx={{
                    fontSize: { xs: '1rem', sm: '1.5rem' },
                    ml: 0.5
                  }}/>
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
            
            <Snackbar open={AlertOpen} autoHideDuration={3000} onClose={handleAlertClose}  anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
              <Alert onClose={handleAlertClose} severity={alertInfo?.severity? alertInfo?.severity : 'warning'} sx={{ width: '100%' }}>
                {alertInfo.message}
              </Alert>
            </Snackbar>
      </ThemeProvider>
    );
}

