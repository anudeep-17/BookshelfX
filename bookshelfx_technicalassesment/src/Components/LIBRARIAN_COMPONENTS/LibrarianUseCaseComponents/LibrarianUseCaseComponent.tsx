'use client';
import theme from "@/Components/Themes";
import { ThemeProvider } from "@mui/material";
import { usePathname } from "next/navigation";
import AddBooksComponent from "./addbooks/AddBooksComponent";
import DeleteBookComponent from "./deletebooks/DeleteBookComponent";
import EditBookComponent from "./editbooks/EditBookComponent";
import AllBookComponent from "./allbooks/AllBookComponent";
import CloseUserRentalsComponenet from "./CloseUserRentals/CloseUserRentalsComponent";

export default function LibrarianUseCaseComponent() {
    const pathname = usePathname();
    const currentUseCase = pathname.split("/")[2];
    return (
        <ThemeProvider theme={theme}>
        {
            currentUseCase === "addBook" ?
            <AddBooksComponent/>
            :
            currentUseCase === "deleteBook" ?
            <DeleteBookComponent/>
            :
            currentUseCase === "editBook" ?
            <EditBookComponent/>
            :
            currentUseCase === "allBooks" ?
            <AllBookComponent/>
            :
            currentUseCase === "closeuserrentals" ?
            <CloseUserRentalsComponenet/>
            :
            null
        }
        </ThemeProvider>
    )
}