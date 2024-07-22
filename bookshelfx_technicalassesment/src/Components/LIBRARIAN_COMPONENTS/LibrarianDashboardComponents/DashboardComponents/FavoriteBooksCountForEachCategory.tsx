import React from "react";
import { Box, Grid, ThemeProvider, Typography } from "@mui/material";
import theme from "@/Components/Themes";
import { BarChart } from '@mui/x-charts/BarChart';

export default function FavoriteBooksCountForEachCategory({categoryWiseFavBooks}:{categoryWiseFavBooks:
    {[key: string]: number}
})
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
                        Number of  <span style={{ color: theme.palette.primary.main, textDecoration: 'underline'}}>favorite books</span> for each category
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
                            xAxis={[{ scaleType:'band', data: Object.keys(categoryWiseFavBooks) }]}
                            series={[{ data: Object.values(categoryWiseFavBooks),  color: theme.palette.primary.main}]}
                            width={1100}
                            height={250}
                            margin={{right: 5}}
                        />
                    </Box>
                </Box>
        </ThemeProvider>
    )
}