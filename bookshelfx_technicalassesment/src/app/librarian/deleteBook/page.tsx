import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

const DeleteBooksComponent = dynamic(() => import('@/Components/LIBRARIAN_COMPONENTS/LibrarianUseCaseComponents/deletebooks/DeleteBookComponent'), { ssr: false, loading: () => <CircularProgress sx={{
                                                                                                                                            position: 'absolute',
                                                                                                                                            top: '50%',
                                                                                                                                            left: '50%',
                                                                                                                                            transform: 'translate(-50%, -50%)',
                                                                                                                                            color: 'primary.main'
                                                                                                                                          }}/>  })

export default function Home() {
    return (
        <>
        <DeleteBooksComponent />
        </>
    );
}