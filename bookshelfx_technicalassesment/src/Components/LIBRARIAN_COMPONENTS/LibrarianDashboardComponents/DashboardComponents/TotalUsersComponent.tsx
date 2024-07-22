import React from "react";
import { Box, Grid, ThemeProvider, Typography } from "@mui/material";
import theme from "@/Components/Themes";

export default function TotalUsersComponent({totalUsers}:{totalUsers: number})
{
    return(
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out', // Add a transition for smooth animation
                    ':hover': {
                        transform: 'translateY(-5px)', // Move the Box up by 5px on hover
                        '& .changeColorOnHover': {
                            color: 'primary.main',
                        },
                    },
                }}
            >
                <Typography variant="h1" color="textSecondary" gutterBottom className="changeColorOnHover"   sx={{
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