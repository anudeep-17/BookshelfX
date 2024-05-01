'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '../Themes';
import {ThemeProvider} from '@mui/material/styles';
import DashBoardImage from "../../assets/Dasboard_image1.jpg"
import { InputAdornment, TextField, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import BookCard from './BookCard';
import BookDetails from '../BookDetails/BookDetails';
import { Book } from '../interfaceModels';
import BooksData from  "../Mock-BookData.json";
import { motion } from "framer-motion"
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
  }

export default function Dashboard_Home(props: Props)
{
    const [searchLabel, setSearchLabel] = React.useState("Search for books, authors, genres...");
    const [isBookSelected, setIsBookSelected] = React.useState(false);
    const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
    
    const handleLearMoreClick = (book: any) => {
        setIsBookSelected(true);
        setSelectedBook(book);    
    }

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
  
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
      <Box>
        <Toolbar sx={{
          mb: 4,
        }}>
          <Typography variant="h5">
            <LocalLibraryIcon sx={{mr:1}}/>
            BookshelfX
          </Typography>
        </Toolbar>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return(
        <ThemeProvider theme={theme}>
            <motion.div
                initial={{y:20, opacity:0}}
                animate={{y:0, opacity:1}}
                transition={{ease: 'easeInOut', duration:0.5}}
            >
                <CssBaseline />
                <Navbar/>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
            </motion.div>
        </ThemeProvider>
    )
}
 