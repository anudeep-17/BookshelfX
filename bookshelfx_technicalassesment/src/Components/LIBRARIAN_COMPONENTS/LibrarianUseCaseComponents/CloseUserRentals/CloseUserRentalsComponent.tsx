import React from "react";
import { Chip, Alert, Box, Button, CircularProgress, CssBaseline, Grid, Pagination, Paper, Snackbar, TextField, ThemeProvider, Toolbar, Typography, Tooltip, FormControl, IconButton, Badge, Autocomplete } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import theme from "@/Components/Themes";
import { DashboardSize } from "@/Components/DashboardSize";
import { BookRentalDetails } from "@/Components/interfaceModels";
import { getAllActiveRentalDetails, getAllRentalDetails } from "@/Services/LibrarianRoutines";
const drawerWidth = DashboardSize;

export default function CloseUserRentalsComponenet()
{
    function createData(rental: BookRentalDetails) {
        return {
            id: rental.id,
            bookId: rental.bookId,
            userId: rental.userId,
            rentalDate: rental.rentalDate,
            returnDate: rental.returnDate,
            returned: rental.returned,
            isOverdue: rental.isOverdue,
            librarianId: rental.librarianId,
            createdAt: rental.createdAt,
            updatedAt: rental.updatedAt,
            book: rental.book,
            user: rental.user,
            librarian: rental.librarian
        };
    }
    
    const [ActiveRentalData , setActiveRentalData] = React.useState<BookRentalDetails[]>([]);
    const [AllRentalData, setAllRentalData] = React.useState<BookRentalDetails[]>([]);

    const [Loading, setLoading] = React.useState(false);
    
    const [CurrentView, setCurrentView] = React.useState('active');
    
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertContent, setAlertContent] = React.useState<{ severity: "success" | "error" | "info" | "warning" | undefined, message: string }>({
        severity: 'success', message: ''
    });



    const handleCloseAlert = (event: React.SyntheticEvent<any, Event> | Event, reason?: string) => {
        if (reason === 'clickaway') 
        {
          return;
        }
        setAlertOpen(false);
    };


    React.useEffect(() => {
         const fetchData = async () => {
            let data;
            if(CurrentView === 'active')
            {
                data = await getAllActiveRentalDetails();
                if(data.success)
                {
                    setActiveRentalData(data.data);
                }
                else
                {
                    setAlertContent({severity: 'error', message: data.message});
                    setAlertOpen(true);
                }
            }
            else
            {
                data = await getAllRentalDetails();
                if(data.success)
                {
                    setAllRentalData(data.data);
                }
                else
                {
                    setAlertContent({severity: 'error', message: data.message});
                    setAlertOpen(true);
                }
            }
            
         }
         setLoading(true);
         fetchData();
         setLoading(false);
    }, [CurrentView]);
    
    React.useEffect(() => {
        const rows = ActiveRentalData.map((rental) => {
            return createData(rental);
        });
        console.log(rows);
    }, [ActiveRentalData]);

    return (
        <ThemeProvider theme={theme}>
           <CssBaseline />  
           <Box sx={{ 
                display: 'flex',
                }}>
                <CssBaseline />
                    <Box
                        component="main"
                        sx={{width: { sm: `calc(100% - ${drawerWidth}px)`}, marginLeft: { sm: `${drawerWidth}px` }, }}
                    >
                        <Toolbar />         
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                p:1.5,
                            }}
                        >
                            <Typography variant="h3" sx={{mt:1}}>
                               User Rental Details
                            </Typography>
                            <Typography variant="body1" sx={{mb:3, mt:1, color: theme.palette.text.secondary}}>
                                view all user rentals and close if returned.
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                alignContent: 'center',
                                p:1.5,
                                width: '100%', 
                                mb:1
                            }}>
                                <Typography variant="h4" sx={{color: theme.palette.primary.main}}>
                                    {CurrentView === 'active'? " All Active Rentals" : "All Closed Rentals"}
                                </Typography>
                                <Button variant="outlined" color="primary" onClick={()=>{CurrentView === "active" ? setCurrentView('closed'): setCurrentView('active')}}>
                                    {CurrentView === 'active'? "View All Closed Rentals": "View All Active Rentals"}
                                </Button>
                            </Box>
                            
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Rental ID</TableCell>
                                            <TableCell align="right">Book ID</TableCell>
                                            <TableCell align="right">User ID</TableCell>
                                            <TableCell align="right">Rental Date</TableCell>
                                            <TableCell align="right">Return Date</TableCell>
                                            <TableCell align="right">Returned</TableCell>
                                            <TableCell align="right">Is Overdue</TableCell>
                                            {CurrentView === 'active' ? null: <TableCell align="right">Librarian ID</TableCell>}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {Loading ? (
                                        <CircularProgress />
                                    ) : (CurrentView === 'active' ? (
                                        ActiveRentalData.length > 0 ? (
                                            ActiveRentalData.map((rental) => (     
                                                <TableRow
                                                    key={rental.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">{rental.id}</TableCell>
                                                    <TableCell align="right">{rental.bookId}</TableCell>
                                                    <TableCell align="right">{rental.userId}</TableCell>
                                                    <TableCell align="right">{new Date(rental.rentalDate).toLocaleString()}</TableCell>
                                                    <TableCell align="right">{new Date(rental.returnDate).toLocaleString()}</TableCell>
                                                    <TableCell align="right">{rental.returned ? 'Yes' : 'No'}</TableCell>
                                                    <TableCell align="right">{rental.isOverdue ? 'Yes' : 'No'}</TableCell>
                                                    <TableCell align="right">{rental.librarianId}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={8} align="center">
                                                    <Typography variant="h6" sx={{color: theme.palette.text.secondary}}>
                                                        No active rentals found
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ) : (
                                        AllRentalData.length > 0 ? (
                                            AllRentalData.map((rental) => (
                                                <TableRow
                                                    key={rental.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">{rental.id}</TableCell>
                                                    <TableCell align="right">{rental.bookId}</TableCell>
                                                    <TableCell align="right">{rental.userId}</TableCell>
                                                    <TableCell align="right">{new Date(rental.rentalDate).toLocaleString()}</TableCell>
                                                    <TableCell align="right">{new Date(rental.returnDate).toLocaleString()}</TableCell>
                                                    <TableCell align="right">{rental.returned ? 'Yes' : 'No'}</TableCell>
                                                    <TableCell align="right">{rental.isOverdue ? 'Yes' : 'No'}</TableCell>
                                                    <TableCell align="right">{rental.librarianId}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={8} align="center">
                                                    <Typography variant="h6" sx={{color: theme.palette.text.secondary}}>
                                                        No rentals found
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))} 
                                    </TableBody>
                                </Table>
                                </TableContainer>
                        </Box>
                    </Box>
            </Box>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} severity={alertContent.severity}>
                {alertContent.message}
              </Alert>
            </Snackbar>
        </ThemeProvider>
    )
}