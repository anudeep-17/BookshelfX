'use client';
import { getBook } from '@/Services/BookRoutines/BookRoutines';
import { AddGoogleBooksToDB } from '@/Services/BookRoutines/GoogleApiToLocalDBRoutines';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Dashboard_Home = dynamic(() => import('@/Components/Dashboard/Dashboard_Home'), { ssr: false })
const Navbar = dynamic(() => import('@/Components/Navbar/Navbar'), { ssr: false })

export default function Home() {

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBook();
      if(!data.success) {
        await AddGoogleBooksToDB();
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar/>
      <Dashboard_Home />
    </>
  );
  
}