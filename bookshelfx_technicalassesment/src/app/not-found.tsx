'use client';
import theme from "@/Components/Themes";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import NotFound from '@/assets/NotFound1.png';
import Image from "next/image";

export default function Home() {
    const router = useRouter();
    const user = JSON.parse(Cookies.get('user') || '{}');
    const pathname = user?.role === 'librarian' ? '/librarian/home' : '/Reader/home';

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100vw",
                    backgroundImage: `url(${NotFound.src})`, // use the image as a background
                    backgroundSize: 'cover', // cover the entire box with the image
                    backgroundPosition: 'center', // center the image
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        color: 'white',  
                    }}
                >
                    <Button variant="contained" color="secondary" fullWidth onClick={()=> {router.push(pathname)}}>
                        Return to Home
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
