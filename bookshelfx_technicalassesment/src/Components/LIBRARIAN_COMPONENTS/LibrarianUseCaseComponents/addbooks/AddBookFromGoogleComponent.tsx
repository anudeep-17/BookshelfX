'use client';
import React from 'react';
import { DashboardSize } from "@/Components/DashboardSize";
import theme from "@/Components/Themes";
import { Box, Button, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const drawerWidth = DashboardSize;
export default function AddBookFromGoogleComponent() 
{
    const [author, setAuthor] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [publisher, setPublisher] = React.useState('');

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />            
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                p:1.5,
            }}
            >
                <Typography variant="h3" sx={{mb:3, mt:1}}>
                    Add a <span style={{color: theme.palette.text.secondary,}}>new book</span> to the library from Google Books
                </Typography>
                 <Grid gridRow={1} container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={3} sx={{p:2, mb:2}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                fullWidth
                                                sx={{mb:2}}
                                            />
                                            <TextField
                                                label="Author"
                                                value={author}
                                                onChange={(e) => setAuthor(e.target.value)}
                                                sx={{mb:2}}
                                            />
                                            <TextField
                                                label="Publisher"
                                                value={publisher}
                                                onChange={(e) => setPublisher(e.target.value)}
                                            />
                                            <Button variant="contained" sx={{mt:2}}>Search on google book </Button>
                                        </FormControl>
                                    </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={8}>
                        <Paper elevation={3} sx={{p:2, mb:2}}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    p:1.5,
                                }}
                            >
                                <Typography variant="h4" sx={{mb:2}}>
                                    Search results
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>              
            </Box>
        </ThemeProvider>
    )
}