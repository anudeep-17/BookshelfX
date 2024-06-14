'use client';
import { DashboardSize } from "@/Components/DashboardSize";
import theme from "@/Components/Themes";
import { Box, Button, CssBaseline, Grid, Paper, Rating, Skeleton, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material";

const drawerWidth = DashboardSize;
export default function AddBookManualComponent() 
{
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
                p:1.5
            }}
            >
                <Typography variant="h3" sx={{mb:2}}>
                    Add a <span style={{color: theme.palette.text.secondary,}}>new book</span> to the library
                </Typography>
                <Paper elevation={3} sx={{p:2, mb:2}}>
                        <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                        <Box 
                            component="label" 
                            htmlFor="upload-button"
                            sx={{ 
                                width: 350,
                                height: 450,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px dashed grey',
                                mb:2,
                            }}
                        >
                            <Button variant="contained" component="span">
                                Upload Image
                            </Button>
                            <input
                                id="upload-button"
                                type="file"
                                accept="image/*"
                                hidden
                            />
                        </Box>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Book Title"
                                    variant="outlined"
                                    sx={{mb:1}}
                                />
                            </Box>
                            <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Authors"
                                    variant="outlined"
                                    sx={{mb:1}}
                            />

                            <Typography variant="body1" sx={{mb:1}}>
                                <Rating value={0} />
                            </Typography>

                            <TextField 
                                    fullWidth
                                    id="outlined-basic"
                                    label="Category"
                                    variant="outlined"
                                    sx={{mb:1}}
                            />
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Page Count"
                                    variant="outlined"
                                    sx={{mb:1}}
                            />

                            <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Publisher"
                                    variant="outlined"
                                    sx={{mb:1}}
                            />

                            <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Published Date"
                                    variant="outlined"
                                    sx={{mb:1}}
                            />

                            <TextField
                                    id="outlined-multiline-static"
                                    label="Book Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    variant="outlined"
                                    sx={{mb:1}}
                                />

                            <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Availability"
                                    variant="outlined"
                                    sx={{mb:1}}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </ThemeProvider>
    )
}