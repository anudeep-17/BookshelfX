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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Authentication, RegisterUser } from '@/Services/UserRoutines';
import {User} from '../interfaceModels';
import Cookies from 'js-cookie';
import { AuthContext } from '../Context/AuthContext';
import Registration from './RegistrationSteps/Registation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Login_Signup() 
{
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isregister, setisregister] = React.useState(false);
    const [Email, setEmail] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [Name, setName] = React.useState('');
    const [ConfirmPassword, setConfirmPassword] = React.useState('');
    const [passwordMatch, setpasswordMatch] = React.useState(false);
    const [Role, setRole] = React.useState('');
    const [showAuthenticationFailed, setShowAuthenticationFailed] = React.useState(false);
    const { setIsAuthenticated } = React.useContext(AuthContext);

    React.useEffect(() => {
        if(searchParams.get('register') === 'true')
        {
            setisregister(true);
        }
        else
        {
            setisregister(false);
        }
    }, [searchParams, pathname ]);

    const handleRegisterRequest = () => {
        router.push(pathname + '?register=true');        
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
                Avatar: authenticate.user.Avatar,
                favoriteCategories: authenticate.user.favoriteCategories
            }
            Cookies.set('user', JSON.stringify(user));
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
                        <Registration />
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