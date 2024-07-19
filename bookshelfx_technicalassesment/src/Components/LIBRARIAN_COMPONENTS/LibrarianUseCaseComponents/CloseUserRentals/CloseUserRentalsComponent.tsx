'use client';
import React from "react";
import { Chip, Alert, Box, Button, CircularProgress, CssBaseline, Grid, Pagination, Paper, Snackbar, TextField, ThemeProvider, Toolbar, Typography, Tooltip, FormControl, IconButton, Badge, Autocomplete, TablePagination } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import theme from "@/Components/Themes";
import { DashboardSize } from "@/Components/DashboardSize";
import { BookRentalDetails } from "@/Components/interfaceModels";
import { getAllActiveRentalDetails, getAllClosedRentalDetails } from "@/Services/LibrarianRoutines";
const drawerWidth = DashboardSize;
import TableSortLabel from '@mui/material/TableSortLabel';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CloseUserRentalsComponenet()
{
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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

    const [TotalClosedRentalRows, setClosedRentalRows] = React.useState(0);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const [Loading, setLoading] = React.useState(false);
    
    const [CurrentView, setCurrentView] = React.useState('active');
    
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertContent, setAlertContent] = React.useState<{ severity: "success" | "error" | "info" | "warning" | undefined, message: string }>({
        severity: 'success', message: ''
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCloseAlert = (event: React.SyntheticEvent<any, Event> | Event, reason?: string) => {
        if (reason === 'clickaway') 
        {
          return;
        }
        setAlertOpen(false);
    };

    React.useEffect(() => {
        if(searchParams.has('ViewClosedRentals') && searchParams.get('ViewClosedRentals') === 'true')
        {
            setCurrentView('closed');
        }
    },[]);

    React.useEffect(() => {
         const fetchData = async () => {
            let data;
            if(CurrentView === 'active')
            {
                data = await getAllActiveRentalDetails(page , rowsPerPage);
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
                data = await getAllClosedRentalDetails(page+1, rowsPerPage);
                if(data.success)
                {
                    setAllRentalData(data.data);
                    setClosedRentalRows(data.totalRentals);    
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
    }, [CurrentView, page, rowsPerPage]);
    
    React.useEffect(() => {
        const rows = ActiveRentalData.map((rental) => {
            return createData(rental);
        });
        
    }, [ActiveRentalData]);

    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof BookRentalDetails>('id');

    const handleSort = (property: keyof BookRentalDetails) => (event: React.MouseEvent<unknown>) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

        const sortedAllRentalData = [...AllRentalData].sort((a, b) => {
            if (a[property] !== undefined && b[property] !== undefined) {
                if (a[property]! < b[property]!) {
                    return order === 'asc' ? -1 : 1;
                }
                if (a[property]! > b[property]!) {
                    return order === 'asc' ? 1 : -1;
                }
            }
            return 0;
        });
        setAllRentalData(sortedAllRentalData);
    };
    
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
                                <Button variant="outlined" color="primary"onClick={() => {
                                            if (CurrentView === "active") {
                                                setCurrentView('closed');
                                                router.push( pathname + '?ViewClosedRentals=true');
                                            } else {
                                                setCurrentView('active');
                                                router.push( pathname );
                                            }
                                        }}>
                                    {CurrentView === 'active'? "View All Closed Rentals": "View All Active Rentals"}
                                </Button>
                            </Box>
                            
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === 'id'}
                                                direction={orderBy === 'id' && order !== 'asc' ? order : 'asc'}
                                                onClick={handleSort('id')}
                                            >
                                                Rental ID
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="right">
                                            <TableSortLabel
                                                active={orderBy === 'bookId'}
                                                direction={orderBy === 'bookId' ? order : 'asc'}
                                                onClick={handleSort('bookId')}
                                            >
                                                Book ID
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="right">
                                            <TableSortLabel
                                                active={orderBy === 'userId'}
                                                direction={orderBy === 'userId' ? order : 'asc'}
                                                onClick={handleSort('userId')}
                                            >
                                                User ID
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="right">
                                            <TableSortLabel
                                                active={orderBy === 'rentalDate'}
                                                direction={orderBy === 'rentalDate' ? order : 'asc'}
                                                onClick={handleSort('rentalDate')}
                                            >
                                                Rental Date
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="right">
                                            <TableSortLabel
                                                active={orderBy === 'returnDate'}
                                                direction={orderBy === 'returnDate' ? order : 'asc'}
                                                onClick={handleSort('returnDate')}
                                            >
                                                Return Date
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="right">Returned</TableCell>
                                        <TableCell align="right">Is Overdue</TableCell>
                                        {CurrentView === 'active' ? null:  <TableCell align="right">
                                            <TableSortLabel
                                                active={orderBy === 'librarianId'}
                                                direction={orderBy === 'librarianId' ? order : 'asc'}
                                                onClick={handleSort('librarianId')}
                                            >
                                                 Librarian ID
                                            </TableSortLabel>
                                        </TableCell>}
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
                                    <TableRow
                                                     
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell colSpan={8} align="center">
                                            <TablePagination
                                                rowsPerPageOptions={[10, 25, 100]}
                                                component="div"
                                                count={CurrentView === 'active' ? ActiveRentalData.length: TotalClosedRentalRows}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                        </TableCell>
                                    </TableRow>
                                   
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