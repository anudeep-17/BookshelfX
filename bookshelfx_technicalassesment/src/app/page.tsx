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
  const [userRole, setUserRole] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setIsAuthenticated(true);
      setUserRole(JSON.parse(user).role);
    }
    setIsLoading(false);
  }, []); 
    
  useEffect(() => {
    if (isAuthenticated) {
      if(userRole === 'librarian')  
      {
        router.push('/librarian/home');
      }
      else
      {
        router.push('/Reader/home');
      }
      
    }
  }, [isAuthenticated, router, userRole]); 

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