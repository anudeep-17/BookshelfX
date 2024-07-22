import React from "react";
import { Box, Grid, ThemeProvider, Typography } from "@mui/material";
import theme from "@/Components/Themes";
import { BarChart } from '@mui/x-charts/BarChart';
import { BookRentalDetails } from "@/Components/interfaceModels";

export default function NumberOfReturnAuthorized({librarianClosedRentals}: {
    librarianClosedRentals: { [key: string]: number };
})
{
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = months.map((month, index) => (librarianClosedRentals ? librarianClosedRentals[index] : 0) || 0);
     
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
                <Typography variant='h6' sx={{ mt: 2, textAlign: 'center', wordSpacing: 2 }}>
                    Number of <span style={{ color: theme.palette.primary.main }}>Closed Rentals</span> per month by you
                </Typography>
                   
                 
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 1,
                    }}
                >
                    <BarChart 
                        xAxis={[
                            { 
                                scaleType:'band', 
                                data:  months,
                            },
                        ]}
                        series={[
                            { 
                                data: data,
                                color: theme.palette.primary.main
                            }
                        ]}
                        width={1200}
                        height={300}
                        margin={{right: 5}}
                    />
                </Box>

            </Box>
           
        </ThemeProvider>
    )
}