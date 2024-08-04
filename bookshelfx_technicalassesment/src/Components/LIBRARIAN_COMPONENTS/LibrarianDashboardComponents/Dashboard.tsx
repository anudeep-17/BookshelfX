'use client';
import React from "react"
import { Alert, Box, Button, Fade, Grid, IconButton, Paper, Slide, Snackbar, ThemeProvider, Typography } from "@mui/material"
import { AllStats } from "@/Services/LibrarianRoutines"
import theme from "@/Components/Themes"
import TotalBooksComponent from "./DashboardComponents/TotalBooksComponent"
import CategorywiseBookCountComponent from "./DashboardComponents/CategorywiseBookCountComponents"
import { BookRentalDetails } from "@/Components/interfaceModels"
import RentalVsAvailableComponent from "./DashboardComponents/RentalVsAvailableComponent"
import TotalUsersComponent from "./DashboardComponents/TotalUsersComponent"
import FavoriteBooksCountForEachCategory from "./DashboardComponents/FavoriteBooksCountForEachCategory"
import TotalOverdueComponent from "./DashboardComponents/TotalOverdueComponent"
import NumberOfOverdueDateComponent from "./DashboardComponents/NumberOfOverdueDateComponent"
import NumberOfReturnAuthorized from "./DashboardComponents/NumberOfReturnAuthorized"
import Cookies from 'js-cookie'
import CloseIcon from '@mui/icons-material/Close';

type statsData = {
    totalBooks: number;
    totalUsers: number;
    rentedBooks: number;
    availableBooks: number;
    categoryWiseBooks: Record<string, number>;
    categoryWiseFavBooks: { [key: string]: number };
    overdueBooks: BookRentalDetails[];
    librarianClosedRentals: { [key: string]: number };
};

export default function Dashboard_Home()
{
    const [stats, setStats] = React.useState<statsData | null>(null);
    const user = JSON.parse(Cookies.get('user') || '');
    const librarianID = user.role === 'librarian' ? user.id : undefined;

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await AllStats(librarianID);
            if (data.success) {
              setStats(data.data);
            }
          };
      
          fetchData();
    }, []);

    const [WelcomeSnackBar, setWelcomeSnackBar] = React.useState(true);

    return(
         <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ml:2,
                    mt:2,
                    mr:2,
                    mb:4,
                    cursor: 'pointer',
                }}
            >
                <Snackbar
                    sx={{
                        mt:5,
                    }}
                    open={WelcomeSnackBar}
                    autoHideDuration={8000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    message="Welcome to the Librarian Dashboard"
                    transitionDuration={500}
                    TransitionComponent={Slide}
                    action={
                        <React.Fragment>
                          <IconButton size="small" aria-label="close" color="inherit" onClick={() => {setWelcomeSnackBar(false)}}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </React.Fragment>
                    }
                    onClose={() => {setWelcomeSnackBar(false)}}
                />

                <Grid container spacing={2}>
                  {stats? 
                    (
                    <>
                        <Grid item xs={12} sm={2}>
                           
                                {
                                    stats.totalBooks !== undefined && stats.totalUsers !== undefined ?
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    >
                                        <Paper elevation={3} sx={{
                                            width: '100%',
                                            height: '49%'
                                        }}>
                                            <TotalBooksComponent totalBooks={stats.totalBooks}/>
                                        </Paper>
                                        <Paper elevation={3} sx={{
                                            width: '100%',
                                            height: '49%'
                                        }}>
                                            <TotalUsersComponent totalUsers={stats.totalUsers}/>
                                        </Paper>
                                    </Box>
                                    :
                                    <Typography variant="h6" color="textSecondary" gutterBottom>
                                        No Data
                                    </Typography>
                                }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {
                                stats.rentedBooks !==undefined && stats.availableBooks !==undefined ?
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                 >
                                    <Paper elevation={3} sx={{alignContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                        <RentalVsAvailableComponent rentalBookCount={stats.rentedBooks} availableBookCount={stats.availableBooks}/>
                                    </Paper>
                                </Box>
                                :
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    No Data
                                </Typography>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            {
                                stats.categoryWiseBooks && Object.keys(stats.categoryWiseBooks).length > 0 ?
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                 > 
                                    <Paper elevation={3} sx={{alignContent: 'center', alignItems: 'center', height: '100%'}}>
                                        <CategorywiseBookCountComponent categoryWiseBooks={stats.categoryWiseBooks}/>
                                    </Paper>
                                </Box>
                                :
                                <Paper elevation={3} sx={{alignContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center'}}>
                                    <Typography variant="h6" color="textSecondary" gutterBottom>
                                        No Data
                                    </Typography>
                                </Paper>
                            }
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {
                                stats.categoryWiseFavBooks ?
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                > 
                                <Paper elevation={3} sx={{alignContent: 'center', alignItems: 'center', width: '100%'}}>
                                    <FavoriteBooksCountForEachCategory categoryWiseFavBooks={stats.categoryWiseFavBooks}/>
                                </Paper>
                                </Box>
                                :
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    No Data
                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            {
                                 stats.overdueBooks?
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                >
                                    <Paper elevation={3} sx={{alignContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                         <TotalOverdueComponent totalOverdueRentals={stats.overdueBooks.length} totalBooks={stats.totalBooks}/>
                                    </Paper>
                                </Box>
                                :
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    No Data
                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            {
                                 stats.overdueBooks?
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                >
                                    <Paper elevation={3} sx={{alignContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                         <NumberOfOverdueDateComponent overdueBooks={stats.overdueBooks}/>
                                    </Paper>
                                </Box>
                                :
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    No Data
                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {
                                 stats.overdueBooks?
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                >
                                    <Paper elevation={3} sx={{alignContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                         <NumberOfReturnAuthorized librarianClosedRentals={stats.librarianClosedRentals}/>
                                    </Paper>
                                </Box>
                                :
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    No Data
                                </Typography>
                            }
                        </Grid>
                    </>
                    )
                    : 
                    null
                    }
                </Grid>
            </Box>
        </ThemeProvider>
    )
}