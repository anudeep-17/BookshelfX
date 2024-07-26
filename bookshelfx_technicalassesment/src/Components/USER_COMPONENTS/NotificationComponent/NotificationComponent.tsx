import React from 'react';
import { Box, Button, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import { ChevronLeft } from '@mui/icons-material';
 
export default function NotificationComponent({anchorEl, setAnchorEl}:
{   
    anchorEl: null | HTMLElement,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
})
{
    const handleClose = () =>
    {
        setAnchorEl(null);
    };

    return(
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem >
             Notification for you 
            </MenuItem>
            <MenuItem >
             Notification for you 
            </MenuItem>
            <MenuItem >
             Notification for you 
            </MenuItem>
            <MenuItem >
             Notification for you 
            </MenuItem>
            <MenuItem >
             Notification for you 
            </MenuItem>
            
        </Menu>
    );
}