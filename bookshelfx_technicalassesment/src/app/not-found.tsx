'use client';
import theme from "@/Components/Themes";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
                    backgroundColor: 'black'
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        color: 'white'
                    }}
                >
                   <Typography variant="h2">Not Found</Typography>
                    <Button variant="contained" color="secondary" fullWidth onClick={()=> {router.push(pathname)}}>
                        Return to Home
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
