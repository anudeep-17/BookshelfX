'use client';
import theme from '@/Components/Themes';
import { BookDetails } from '@/Components/interfaceModels';
import { ArrowBack } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Chip, Alert, Box,  Drawer, Typography, Divider, Paper, IconButton, Tooltip, Button } from "@mui/material";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import React from 'react';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

export default function DrawerComponent({open, setOpen, DeletionList,  setDeletionList, handleDeleteAll}:
    {
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        DeletionList:  BookDetails[],
        setDeletionList: React.Dispatch<React.SetStateAction<BookDetails[]>>,
        handleDeleteAll: () => void
    }) {
    
    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    
          
    const handleClick = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation">
            <IconButton onClick={toggleDrawer(false)} sx={{alignSelf: 'flex-end', mt:1}}>
                <ArrowBack sx={{
                    color: theme.palette.primary.main
                }}/>
            </IconButton>
            <Typography variant="h5" textAlign={"center"} sx={{
                mt: 1, 
                color: theme.palette.primary.main
            }}>
                Deletion list
            </Typography>

            <Divider sx={{m:2}}/>

            {DeletionList.length === 0 ? (
                <Typography variant="body1" textAlign={"center"}>
                    No books added to list for deletion
                </Typography>
            ) : (
                DeletionList.map((book) => (
                    <Paper elevation={4} sx={{m:2, p:2}} key={book.id}>
                        <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                            <Box sx={{display: 'flex', flexDirection:'column'}}>
                                <Typography variant="h6">
                                    {book.title.length > 15 ? book.title.slice(0, 15) + '...' : book.title}
                                </Typography>
                                <Typography variant="body1">
                                    {book.authors[0] + '...'}
                                </Typography>
                            </Box>
                            <Tooltip title="Remove" placement='top'>
                                <IconButton onClick={() => {
                                    setDeletionList(prev => prev.filter(item => item.id !== book.id));
                                }}>   
                                    <CloseIcon sx={{
                                        color: theme.palette.text.secondary
                                    }}/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Paper>
                ))
            )}

            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" disabled = {DeletionList.length===0} sx={{
                    p:2,
                    width: '90%',
                    mb:3,
                    mt:1
                }} 
                onClick={handleDeleteAll}>
                    Delete Book(s) on this list
                </Button>
            </Box>
        </Box>
      );

    return (
        <SwipeableDrawer anchor={'right'} open={open} onClose={toggleDrawer(false)}  onOpen={toggleDrawer(true)}>
            {DrawerList}
        </SwipeableDrawer>
        
    )
}