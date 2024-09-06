import React from "react";
import { Box, Grid, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import theme from "@/Components/Themes";

export default function TotalUsersComponent({totalUsers}:{totalUsers: number})
{
    const themeofscreen = useTheme();
    const isSmallScreen = useMediaQuery(themeofscreen.breakpoints.down('sm'));
    return(
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'transform 0.3s ease-in-out', // Add a transition for smooth animation
                    ':hover': {
                        transform: 'translateY(-5px)', // Move the Box up by 5px on hover
                        '& .changeColorOnHover': {
                            color: 'primary.main',
                        },
                    },
                }}
            >
                <Typography variant={isSmallScreen ? "h4" : "h1"} color="textSecondary" gutterBottom className="changeColorOnHover"   sx={{
                    transition: 'color 0.6s ease-in-out',
                }}>
                    {totalUsers}
                </Typography>
                <Typography variant="h6" color="text.primary"  gutterBottom>
                    Total Users
                </Typography>
            </Box>
        </ThemeProvider>
    )
}