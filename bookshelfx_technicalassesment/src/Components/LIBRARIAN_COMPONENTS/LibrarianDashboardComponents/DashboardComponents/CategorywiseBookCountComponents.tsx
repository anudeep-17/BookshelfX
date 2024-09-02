import React from "react";
import { Box, Grid, ThemeProvider, Typography } from "@mui/material";
import theme from "@/Components/Themes";
import { PieChart } from '@mui/x-charts/PieChart';


export default function CategorywiseBookCountComponent({categoryWiseBooks}:{categoryWiseBooks: 
{
    [key: string]: number
}})
{
    return(
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                     display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'transform 0.3s ease-in-out',  
                    ':hover': {
                        transform: 'translateY(-5px)',  
                        '& .changeColorOnHover': {
                            color: 'primary.main',
                        },
                    },
                }}
            >
                <Typography variant='h6' sx={{ mt: 2,mb:2 , textAlign: 'center', wordSpacing: 2 }}>
                    Number of Books in <span style={{ color: theme.palette.primary.main, textDecoration: 'underline'}}> Catergory </span>  
                </Typography>
                <PieChart
                    colors={[theme.palette.primary.main, theme.palette.secondary.main, theme.palette.text.primary, theme.palette.text.secondary]}
                    series={[
                        {
                            data: Array.isArray(categoryWiseBooks) ? categoryWiseBooks.map((item, index) => {
                                return {
                                    id: index,
                                    value: item._count.category,
                                    label: item.category
                                }
                            }) : [],
                            highlightScope: { faded:'series', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]
                    }
                    slotProps={{
                        legend: { hidden: true },
                    }}
                    margin={{right: 5}}
                    height={350}
                    sx={{
                        ml:2, 
                        mr:2,
                        mb:2
                    }}
                />
            </Box>
        </ThemeProvider>
    )
}