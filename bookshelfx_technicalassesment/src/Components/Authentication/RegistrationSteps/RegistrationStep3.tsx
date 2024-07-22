import Image from 'next/image';
import ReadAllBooks from '@/assets/ReadAllBooks.gif'
import { Box, Typography } from '@mui/material';

export default function RegistationStep3() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                mt:2,
                mb:2,
            }}
        >
            <Typography variant="h4" sx={{mb: 2}}>You are all set!</Typography>
            <Image src={ReadAllBooks.src} alt="Description of GIF" width={500} height={300} />
        </Box>
    );
}