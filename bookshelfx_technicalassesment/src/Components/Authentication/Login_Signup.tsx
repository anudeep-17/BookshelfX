'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '../Themes';
import { ThemeProvider } from '@mui/material/styles';
import { Alert, FormControl, IconButton, InputAdornment, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { red } from '@mui/material/colors';
import { Create, Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../Context/AuthContext';
import { Authentication, RegisterUser } from '@/Services/UserRoutines';
import {User} from '../interfaceModels';
import { UserContext } from '../Context/UserContext';
import Snackbar from '@mui/material/Snackbar';
import Cookies from 'js-cookie';


export default function Login_Signup() {
    const [isregister, setisregister] = React.useState(false);
    const [Email, setEmail] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [Name, setName] = React.useState('');
    const [ConfirmPassword, setConfirmPassword] = React.useState('');
    const [passwordMatch, setpasswordMatch] = React.useState(false);
    const [Role, setRole] = React.useState('');

    const [showAuthenticationSuccess, setShowAuthenticationSuccess] = React.useState(false);
    const [showAuthenticationFailed, setShowAuthenticationFailed] = React.useState(false);

    const { setIsAuthenticated } = React.useContext(AuthContext);
    const { setUser } = React.useContext(UserContext);

    const handleRegisterRequest = () => {
        setisregister(true);
    };

    const handleRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setpasswordMatch(e.target.value === ConfirmPassword);
    };
    
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setpasswordMatch(Password === e.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

    const handleAuthentication = async() => {
        const authenticationdetails = {
            email: Email,
            password: Password
        }
        const authenticate = await Authentication(authenticationdetails);
        if(authenticate.success)
        {
            const user: User = {
                id: authenticate.user.id,
                email: authenticate.user.email,
                name:  authenticate.user.name,
                role:  authenticate.user.role,
            }
            setUser(user);
            sessionStorage.setItem('user', JSON.stringify(user));
            Cookies.set('user', JSON.stringify(user));
            setShowAuthenticationSuccess(true);
            setIsAuthenticated(true);
        }
        else
        {
            setShowAuthenticationFailed(true);
        }
    }
    
    const handleRegister = async () => {
        const Registerdetails = {
            name: Name,
            email: Email,
            password: Password,
            role: Role
        }
        const register = await RegisterUser(Registerdetails);
        if(register.success)
        {
            const user: User = {
                id: register.user.id,
                email: register.user.email,
                name:  register.user.name,
                role:  register.user.role,
            }
            setUser(user);
            sessionStorage.setItem('user', JSON.stringify(user));
            setShowAuthenticationSuccess(true);
            setIsAuthenticated(true);
        }
        else
        {
            setShowAuthenticationFailed(true);
        }
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
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleRegister();
                            }}
                        >
                            
                            <TextField
                                required
                                id="standard-required"
                                label="Name"
                                variant="standard"
                                sx={{ mb: 2 }}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Email"
                                variant="standard"
                                sx={{ mb: 2 }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Pasword"
                                variant="standard"
                                type="password"
                                sx={{ mb: 2, ...(passwordMatch ? {} : { color: red[500], '& .MuiInput-underline:after': { borderBottomColor: red[500] } }) }}
                                onChange={handlePasswordChange}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Confirm Pasword"
                                variant="standard"
                                type="password"
                                sx={{ mb: 2, ...(passwordMatch ? {} : { color: red[500], '& .MuiInput-underline:after': { borderBottomColor: red[500] } }) }}
                                onChange={handleConfirmPasswordChange}
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
                                onClick={handleRegister}
                                type='submit'
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
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAuthentication();
                            }}
                        >
                            <TextField
                                required
                                id="standard-required"
                                label="Email"
                                variant="standard"
                                sx={{ mb: 2 }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                           <TextField
                            required
                            id="standard-required"
                            label="Password"
                            variant="standard"
                            type={showPassword ? 'text' : 'password'}
                            sx={{ mb: 2 }}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    mt: 2,
                                    mb: 2,
                                }}
                                onClick={() => {
                                    handleAuthentication();
                                }}
                                type='submit'
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
                
                {
                    showAuthenticationFailed ? (
                        <Alert severity="error">
                            Login Failed, Please check your credentials
                        </Alert>
                    ) : null
                }


            </Box>
        </ThemeProvider>
    );
}