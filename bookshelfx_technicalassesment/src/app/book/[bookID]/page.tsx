'use client';
import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const WholeBookData = dynamic(() => import('@/Components/USER_COMPONENTS/BookComponent/WholeBookData'), { ssr: false, loading: () => <CircularProgress sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'primary.main'
  }}/>  })
  const Navbar = dynamic(() => import('@/Components/Navbar/Navbar'), { ssr: false })

export default function WholeBook()
{
    const pathname = usePathname();
    const bookID = pathname.split('/')[2];
    console.log(bookID)
    return(
        <>
            <Navbar/>
            <WholeBookData id={bookID} />
        </>
    )
}
