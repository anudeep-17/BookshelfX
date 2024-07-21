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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

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
            expectedReturnDate: rental.expectedReturnDate,
            userInitiatedReturn: rental.userInitiatedReturn,
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
    const [ClosedRentalData, setClosedRentalData] = React.useState<BookRentalDetails[]>([]);

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
                data = await getAllActiveRentalDetails(page+1, rowsPerPage);
                if(data.success)
                {
                    console.log(data.data);
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
                    setClosedRentalData(data.data);
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
    

    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof BookRentalDetails>('id');

    const handleSort = (property: keyof BookRentalDetails) => (event: React.MouseEvent<unknown>) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

        let currentViewData = CurrentView === 'active' ? ActiveRentalData : ClosedRentalData;

        const sortedData = [...currentViewData].sort((a, b) => {
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

        if (CurrentView === 'active') 
        {
            setActiveRentalData(sortedData);
        } 
        else 
        {
            setClosedRentalData(sortedData);
        }
    };


    const exportPDF = () => 
    {
        const doc = new jsPDF();
        doc.setFontSize(30);
        let text = 'BookShelfX';
        let textWidth = doc.getTextWidth(text);
        let pageCenter = doc.internal.pageSize.getWidth() / 2;
        doc.text(text, pageCenter - textWidth / 2, 15);

        doc.setFontSize(15);
        text = CurrentView === 'closed' ? 'Closed Rental Data': 'Active Rental Data';
        textWidth = doc.getTextWidth(text);
        doc.text(text, pageCenter - textWidth / 2, 30);

        const tableColumn = CurrentView ==='closed'? 
            ["ID", "Book ID", "User ID", "Rental Date", "Expected Return Date", "Return Date", "Returned", "Is Overdue", "Librarian ID"]:
            ["ID", "Book ID", "User ID", "Rental Date", "Expected Return Date", "Return Date", "Return Initiated By User", "Returned", "Is Overdue"];

        const tableRows: (string | number | boolean)[][] = []; // Each row is an array of string, number, or boolean

        const dataToExport = CurrentView === 'active' ? ActiveRentalData : ClosedRentalData;

        dataToExport.forEach(rental => {
        const rentalData: (string | number | boolean)[] = CurrentView === 'closed' ? [ // Each rentalData is an array of string, number, or boolean
            rental.id,
            rental.bookId,
            rental.userId,
            new Date(rental.rentalDate).toLocaleDateString(),
            new Date(rental.expectedReturnDate).toLocaleDateString(),
            rental.returnDate? new Date(rental.returnDate).toLocaleDateString() : 'N/A',
            rental.returned,
            rental.isOverdue,
            rental.librarianId? rental.librarianId : 'N/A',
          
        ]:
        [
            rental.id,
            rental.bookId,
            rental.userId,
            new Date(rental.rentalDate).toLocaleDateString(),
            new Date(rental.expectedReturnDate).toLocaleDateString(),
            rental.returnDate? new Date(rental.returnDate).toLocaleDateString() : 'N/A',
            rental.userInitiatedReturn,
            rental.returned,
            rental.isOverdue,
        ]
        tableRows.push(rentalData);
        }
        );

        autoTable(doc, { startY: 45, tableWidth: 'auto', head: [tableColumn], body: tableRows });
        doc.save("rental_data.pdf");
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
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap:2                            
                                }}>
                                    <Tooltip title="Export Rental Records as PDF">
                                        <IconButton onClick={exportPDF}>
                                            <PictureAsPdfIcon />
                                        </IconButton>
                                    </Tooltip>
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
                             
                            </Box>
                            
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === 'id'}
                                                direction={orderBy === 'id' && order !== 'asc' ? order : 'asc'}
                                                onClick={handleSort('id',)}
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
                                                active={orderBy === 'expectedReturnDate'}
                                                direction={orderBy === 'expectedReturnDate' ? order : 'asc'}
                                                onClick={handleSort('expectedReturnDate')}
                                            >
                                              Expected Return Date
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

                                        {
                                            CurrentView === 'active' ?   <TableCell align="right">Return Initiated By User</TableCell>: null
                                        }

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
                                        
                                        {
                                            CurrentView === 'active' ? <TableCell align="right">Close Rental</TableCell> : null
                                        }                          

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
                                                    <TableCell align="right">{new Date(rental.expectedReturnDate).toLocaleString()}</TableCell>
                                                    <TableCell align="right">{rental.returnDate ? new Date(rental.returnDate).toLocaleString() : 'N/A'}</TableCell>
                                                    <TableCell align="right">{rental.userInitiatedReturn ? 'Yes' : 'No'}</TableCell>
                                                    <TableCell align="right">{rental.returned ? 'Yes' : 'No'}</TableCell>
                                                    <TableCell align="right">{rental.isOverdue ? 'Yes' : 'No'}</TableCell>
                                                    <TableCell align="right">
                                                        <Button variant="contained" color="primary"  disabled ={!rental.userInitiatedReturn}>
                                                            Close Rental
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={10} align="center">
                                                    <Typography variant="h6" sx={{color: theme.palette.text.secondary}}>
                                                        No active rentals found
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ) : (
                                        ClosedRentalData.length > 0 ? (
                                            ClosedRentalData.map((rental) => (
                                                <TableRow
                                                    key={rental.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">{rental.id}</TableCell>
                                                    <TableCell align="right">{rental.bookId}</TableCell>
                                                    <TableCell align="right">{rental.userId}</TableCell>
                                                    <TableCell align="right">{new Date(rental.rentalDate).toLocaleString()}</TableCell>
                                                    <TableCell align="right">{new Date(rental.expectedReturnDate).toLocaleString()}</TableCell>
                                                    <TableCell align="right">{rental.returnDate ? new Date(rental.returnDate).toLocaleString() : 'N/A'}</TableCell>
                                                    <TableCell align="right">{rental.returned ? 'Yes' : 'No'}</TableCell>
                                                    <TableCell align="right">{rental.isOverdue ? 'Yes' : 'No'}</TableCell>
                                                    <TableCell align="right">{rental.librarianId}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={9} align="center">
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
                                        <TableCell colSpan={10} align="center">
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