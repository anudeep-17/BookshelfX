import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function ImageUrlDialog({bookImage, setBookImage, open, onClose}:{
    open: boolean,
    onClose: () => void,
    bookImage: string,
    setBookImage: React.Dispatch<React.SetStateAction<string>>
}) 
{
    const [imageUrl, setImageUrl] = useState('');
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Book Image</DialogTitle>
            <DialogContent>
                <TextField
                    label="Book Image"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {setBookImage(imageUrl); onClose();}} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )

}