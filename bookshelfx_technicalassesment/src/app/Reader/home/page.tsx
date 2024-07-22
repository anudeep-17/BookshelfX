'use client';
import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';

const Dashboard_Home = dynamic(() => import('@/Components/Dashboard/Dashboard_Home'), { ssr: false, 
loading: () => 
  <CircularProgress sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'primary.main'
  }}/> 
})

export default function Home() {
  return (
    <>
      <Dashboard_Home />
    </>
  );
  
}