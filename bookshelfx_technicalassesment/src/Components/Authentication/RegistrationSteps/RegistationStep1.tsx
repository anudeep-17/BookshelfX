import * as React from 'react';
import Box from '@mui/material/Box';
import theme from '@/Components/Themes';
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
import {User} from '@/Components/interfaceModels';
import Cookies from 'js-cookie';
import { AuthContext } from '@/Components/Context/AuthContext';
import PasswordChecklist from "react-password-checklist"


export default function RegistrationStep1(
    {
        Email, 
        setEmail,
        Password,
        setPassword,
        name,
        setName,
        ConfirmPassword,
        setConfirmPassword,
        passwordMatch,
        setpasswordMatch,
        Role,
        setRole,
        showPassword,
        setShowPassword,
    }:
    {
        Email: string,
        setEmail: React.Dispatch<React.SetStateAction<string>>,
        Password: string,
        setPassword: React.Dispatch<React.SetStateAction<string>>,
        name: string,
        setName: React.Dispatch<React.SetStateAction<string>>,
        ConfirmPassword: string,
        setConfirmPassword: React.Dispatch<React.SetStateAction<string>>,
        passwordMatch: boolean,
        setpasswordMatch: React.Dispatch<React.SetStateAction<boolean>>,
        Role: string,
        setRole: React.Dispatch<React.SetStateAction<string>>,
        showPassword: boolean,
        setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
    }
) {
    const handlePasswordChange = (  e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setpasswordMatch(e.target.value === ConfirmPassword);
    };

    const handleConfirmPasswordChange = (   e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setpasswordMatch(Password === e.target.value);
    };


    const handleRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    }

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

    return (
        <ThemeProvider theme={theme}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mt: 2, // remove margin
                        padding: 0, // remove padding
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        width: '100%',
                        height: '100%',
                        overflow: 'auto' 
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                
                    <TextField
                        required
                        id="standard-required"
                        label="Name"
                        variant="standard"
                        sx={{ mb: 2 }}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        focused = {name.length > 0}
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Email"
                        variant="standard"
                        sx={{ mb: 2 }}
                        onChange={(e) => setEmail(e.target.value)}
                        value={Email}
                        focused = {Email.length > 0}
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        error={Password !== ConfirmPassword}  
                        sx={{ mb: 2}}
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
                        onChange={handlePasswordChange}
                        value={Password}
                        focused = {Password.length > 0}
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Confirm Pasword"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        error={Password !== ConfirmPassword}  
                        sx={{ mb: 2}}
                        onChange={handleConfirmPasswordChange}
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
                        value={ConfirmPassword}
                        focused = {ConfirmPassword.length > 0}
                    />
                    <PasswordChecklist
                        rules={["minLength","specialChar","number","capital","match"]}
                        minLength={8}
                        value={Password}
                        valueAgain={ConfirmPassword}
                        messages={{
                            minLength: "The password has more than 8 characters.",
                            specialChar: "The password has special characters.",
                            number: "The password has a number.",
                            capital: "The password has an uppercase letter.",
                            match: "The passwords match."
                        }}
                        style={{marginBottom:20}}
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
                </Box>
        </ThemeProvider>
    );
}