'use client';
import { DashboardSize } from "@/Components/DashboardSize";
import theme from "@/Components/Themes";
import { Box, Button, CssBaseline, Grid, Paper, Rating, Skeleton, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material";
import AddBookManualComponent from "./AddBookManualComponent";
import AddBookFromGoogleComponent from "./AddBookFromGoogleComponent";
import GoogleIcon from '@mui/icons-material/Google';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import { useRouter } from "next/navigation";

const drawerWidth = DashboardSize;

export default function AddBooksComponent() 
{
    const router = useRouter();
    const handleAddBookManually = () => {
        router.push('/librarian/addBook/manually');
    }
    const handleAddBookFromGoogle = () => {
        router.push('/librarian/addBook/byGoogle');
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />            
            <Box sx={{ 
                display: 'flex',
                }}>
                <CssBaseline />
                    <Box
                        component="main"
                        sx={{width: { sm: `calc(100% - ${drawerWidth}px)`}, marginLeft: { sm: `${drawerWidth}px` }, }}
                    >
                        <Toolbar />
                        <Box 
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                p:1.5
                            }}>
                                <Typography variant="h3" sx={{mb:2}}>
                                    Add a <span style={{color: theme.palette.text.secondary,}}>new book</span> to the library
                                </Typography>
                                <Typography variant="body1" sx={{mb:2}}>
                                    please select a method to add a new book to the library
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        p:1.5,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Paper elevation={3} sx={{p:2, mb:2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                                                <Button variant="contained" 
                                                    size="large"
                                                    sx={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }} 
                                                    onClick={handleAddBookFromGoogle}
                                                >
                                                    <GoogleIcon sx={{fontSize: 300,  mb:2}} />
                                                    <Typography variant="h2">
                                                        Add book from Google
                                                    </Typography>
                                                </Button>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Paper elevation={3} sx={{p:2, mb:2, display: 'flex', justifyContent: 'center', alignItems: 'center',  width: '100%'}}>
                                               
                                                <Button variant="outlined" size="large"  
                                                    sx={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}  
                                                    onClick={handleAddBookManually}>
                                                    <SpellcheckIcon sx={{fontSize: 300, mb:2}} />
                                                    <Typography variant="h2">
                                                        Add book manually
                                                    </Typography>
                                                </Button>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                    </Box>
            </Box>
        </ThemeProvider>
    )
}