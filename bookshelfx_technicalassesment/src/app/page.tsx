"use client"
import React, { useEffect } from "react";
import dynamic from 'next/dynamic'
import { AuthContext } from "@/Components/Context/AuthContext";
import Cookies from 'js-cookie';


const Dashboard_Home = dynamic(() => import('@/Components/Dashboard/Dashboard_Home'), {})
const Auth = dynamic(() => import('@/Components/Authentication/Auth'), {} )

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    try {
      const user = Cookies.get('user');
      if (user) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  }, [setIsAuthenticated]);
    
  if (isLoading) {
    return null; // replace with your actual loading component
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <div>
        {isAuthenticated ? (
          <>
           <Dashboard_Home />
          </>
        ) : (
          <Auth />
        )}
      </div>
    </AuthContext.Provider>
  );
}