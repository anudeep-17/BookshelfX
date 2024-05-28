'use client';
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { AuthContext } from "@/Components/Context/AuthContext";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation"; // corrected from "next/navigation"
const Auth = dynamic(() => import('@/Components/Authentication/Auth'), { ssr: false } ) // disable server-side rendering for Auth component

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
      router.push('/Reader/home');
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