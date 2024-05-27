import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

const BookDisplayComponent = dynamic(() => import('@/Components/USER_COMPONENTS/BookDisplayComponent/BookDisplayComponent'), { ssr: false, loading: () => <CircularProgress sx={{
                                                                                                                                                position: 'absolute',
                                                                                                                                                top: '50%',
                                                                                                                                                left: '50%',
                                                                                                                                                transform: 'translate(-50%, -50%)',
                                                                                                                                                color: 'primary.main'
                                                                                                                                              }}/>  })

export default function Home() {
  return (
    <>
      <BookDisplayComponent />
    </>
  );
}