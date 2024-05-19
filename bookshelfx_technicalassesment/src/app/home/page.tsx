'use client';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Dashboard_Home = dynamic(() => import('@/Components/Dashboard/Dashboard_Home'), { ssr: false })
const Navbar = dynamic(() => import('@/Components/Navbar/Navbar'), { ssr: false })

export default function Home() {
  return (
    <>
      <Navbar/>
      <Dashboard_Home />
    </>
  );
  
}