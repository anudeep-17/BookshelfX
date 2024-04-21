'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '../Themes';
import { ThemeProvider } from '@mui/material/styles';
import { FormControl, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Login_Signup() {
    const [isregister, setisregister] = React.useState(false);
    const [Role, setRole] = React.useState('');

    const handleRegisterRequest = () => {
        setisregister(true);
    };

    const handleRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: ['column', 'column'], // column layout for small screens, row layout for larger screens
                }}
            >
                {isregister ? (
                    <>
                        <Typography variant="h4" letterSpacing={2}>
                            Signup
                        </Typography>
                        <Typography variant="body2" letterSpacing={0} sx={{ mt: 1 }}>
                            Discover, Explore, Read: Your Personal Gateway to Infinite Worlds
                        </Typography>

                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 4, // remove margin
                                padding: 0, // remove padding
                                backdropFilter: 'blur(10px)',
                                backgroundColor: 'rgba(255,255,255,0.5)',
                                width: '100%',
                                height: '100%',
                                overflowX: 'hidden', // disable horizontal scrolling
                                overflowY: 'hidden', // disable vertical scrolling
                            }}
                        >
                            <TextField
                                required
                                id="standard-required"
                                label="Name"
                                variant="standard"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Email"
                                variant="standard"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Pasword"
                                variant="standard"
                                type="password"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Confirm Pasword"
                                variant="standard"
                                type="password"
                                sx={{ mb: 2 }}
                            />
                             <FormControl fullWidth sx={{mt:1}}>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Role}
                                    label="Role"
                                    onChange={handleRoleChange}
                                    sx={{ mb: 2 }}
                                >
                                    <MenuItem value={'Librarian'}>Librarian</MenuItem>
                                    <MenuItem value={'Customer'}>Customer</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    mt: 2,
                                    mb: 2,
                                }}
                                onClick={handleRegisterRequest}
                            >
                                Register
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    width: '100%',
                                    mb: 2,
                                }}
                                onClick={() => {
                                    setisregister(false);
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h4" letterSpacing={2}>
                            Login
                        </Typography>
                        <Typography variant="body2" letterSpacing={0} sx={{ mt: 1 }}>
                            Welcome back to BookshelfX! Please enter your details to login.
                        </Typography>

                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 4, // remove margin
                                padding: 0, // remove padding
                                backdropFilter: 'blur(10px)',
                                backgroundColor: 'rgba(255,255,255,0.5)',
                                width: '100%',
                                height: '100%',
                                overflowX: 'hidden', // disable horizontal scrolling
                                overflowY: 'hidden', // disable vertical scrolling
                            }}
                        >
                            <TextField
                                required
                                id="standard-required"
                                label="Email"
                                variant="standard"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Pasword"
                                variant="standard"
                                type="password"
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    mt: 2,
                                    mb: 2,
                                }}
                                onClick={() => {
                                    setisregister(false);
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    width: '100%',
                                    mb: 2,
                                }}
                                onClick={handleRegisterRequest}
                            >
                                Register
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </ThemeProvider>
    );
}