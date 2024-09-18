'use client';
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { AuthContext } from "@/Components/Context/AuthContext";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation"; // corrected from "next/navigation"
import { CircularProgress } from "@mui/material";


const Auth = dynamic(() => import('@/Components/Authentication/Auth'), { ssr: false, 
  loading: () => 
    <CircularProgress sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'primary.main'
    }}/> 
  }) // disable server-side rendering for Auth component

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []); 
    
  useEffect(() => {
    if (isAuthenticated) {
      const user = Cookies.get('user');
      if(user && router)
      {
        if(JSON.parse(user).role === 'Customer') 
        {
          router.push('/Reader/home');
        }
        else if(JSON.parse(user).role === 'Librarian')
        {
          router.push('/librarian/home');
        }
      }
      else
      {
        router.push('/');
      }
    }
    else
    {
      router.push('/');
    }
  }, [isAuthenticated, router]); 

  if (isLoading) {
    return null;  
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <div>
        {isAuthenticated ? null : <Auth />}
      </div>
    </AuthContext.Provider>
  );
}