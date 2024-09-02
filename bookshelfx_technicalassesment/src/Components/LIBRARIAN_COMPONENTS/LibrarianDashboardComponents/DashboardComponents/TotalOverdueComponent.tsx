import React from "react";
import { Box, Divider, Grid, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import theme from "@/Components/Themes";
import { Gauge,  gaugeClasses } from '@mui/x-charts/Gauge';

export default function TotalOverdueComponent({totalOverdueRentals, totalBooks}:{totalOverdueRentals: number, totalBooks: number})
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
                <Gauge width={isSmallScreen? 395: 200} height={isSmallScreen? 300: 100} value={totalOverdueRentals} startAngle={-90} endAngle={90} valueMin={0} valueMax={totalBooks}  
                    cornerRadius="50%"
                    sx={(theme) => ({
                        position: 'relative',
                        [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 40,
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                            fill: theme.palette.primary.main,
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                            fill: theme.palette.text,
                        },
                })}/>
            
                <Typography variant="h6" color="text.primary"  gutterBottom sx={{
                    textAlign: 'center',
                    wordSpacing: 2,
                    mt: 2
                }} >
                    <Divider sx={{ ml:1, mr:1, borderColor: 'primary.main' }}/>
                    Total <span style={{ color: theme.palette.primary.main}}>Overdue</span> Rentals
                </Typography>
            </Box>
        </ThemeProvider>
    )
}