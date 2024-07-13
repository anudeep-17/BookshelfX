'use client';
import theme from "@/Components/Themes";
import { ThemeProvider } from "@mui/material";
import { usePathname } from "next/navigation";
import AddBooksComponent from "./addbooks/AddBooksComponent";

export default function LibrarianUseCaseComponent() {
    const pathname = usePathname();
    const currentUseCase = pathname.split("/")[2];
    return (
        <ThemeProvider theme={theme}>
        {
            currentUseCase === "addbooks" ?
            <AddBooksComponent/>
            :
            null
        }
        </ThemeProvider>
    )
}