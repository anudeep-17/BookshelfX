"use client"
import Auth from "@/Components/Authentication/Auth";
import Dashboard_Home from "@/Components/Dashboard/Dashboard_Home";
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";
import { AuthContext } from "@/Components/Context/AuthContext";
import Grow from '@mui/material/Grow';


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

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