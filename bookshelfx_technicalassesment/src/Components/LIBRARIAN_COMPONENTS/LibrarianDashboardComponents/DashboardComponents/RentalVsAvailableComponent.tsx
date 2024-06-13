import React from "react";
import { Box, Grid, ThemeProvider, Typography } from "@mui/material";
import theme from "@/Components/Themes";
import { BarChart } from '@mui/x-charts/BarChart';

export default function RentalVsAvailableComponent({rentalBookCount, availableBookCount}:{rentalBookCount: number, availableBookCount: number})
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
                <Typography variant='h6' sx={{ mt: 2, textAlign: 'center', wordSpacing: 2 }}>
                    Available Books vs <span style={{ color: theme.palette.primary.main }}>Rented</span> Books
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
                        xAxis={[{ scaleType:'band', data: ['Number of Rental Books', 'Number of Available Books'] }]}
                        series={[{ data: [rentalBookCount, availableBookCount],  
                                   color: theme.palette.text.secondary }]}
                        width={500}
                        height={300}
                        margin={{right: 5}}
                    />
                </Box>

            </Box>
           
        </ThemeProvider>
    )
}