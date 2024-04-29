"use client"
import Navbar from "@/Components/Navbar/Navbar";
import React, { useEffect } from "react";
import Grow from '@mui/material/Grow';
import dynamic from 'next/dynamic'
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AuthProvider } from "@/Components/Context/AuthContext";

const Dashboard_Home = dynamic(() => import('@/Components/Dashboard/Dashboard_Home'), {})
const Auth = dynamic(() => import('@/Components/Authentication/Auth'), {} )

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // or return a loading spinner
  }
  
  return (
    <AuthProvider>
      {isAuthenticated ? <Dashboard_Home /> : <Auth />}
    </AuthProvider>
  );
}