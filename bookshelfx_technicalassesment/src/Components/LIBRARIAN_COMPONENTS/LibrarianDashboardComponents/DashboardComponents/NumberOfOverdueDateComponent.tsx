import React from "react";
import { Box, Grid, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import theme from "@/Components/Themes";
import { BarChart } from '@mui/x-charts/BarChart';
import { BookRentalDetails } from "@/Components/interfaceModels";

export default function NumberOfOverdueDateComponent({ overdueBooks }: { overdueBooks: BookRentalDetails[]})
{
    
    function getWeekNumber(d: Date): number {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
        return weekNo;
      }

      const overduesPerWeek = overdueBooks.reduce((acc: Record<string, number>, book) => {
        const weekNumber = getWeekNumber(new Date(book.rentalDate));
        acc[weekNumber] = (acc[weekNumber] || 0) + 1;
        return acc;
      }, {});

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
                <Typography variant='h6' sx={{ mt: 2, textAlign: 'center', wordSpacing: 2 }}>
                    Number of <span style={{ color: theme.palette.primary.main }}>Overdue</span> Books Per Week
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
                                data: Object.keys(overduesPerWeek).map(key => `Week ${key}`)
                            },
                        ]}
                        series={[
                            { 
                                data: Object.values(overduesPerWeek),
                                color: theme.palette.text.secondary
                            }
                        ]}
                        width={isSmallScreen? 300 : 1000}
                        height={300}
                        margin={{right: 5}}
                    />
                </Box>

            </Box>
           
        </ThemeProvider>
    )
}