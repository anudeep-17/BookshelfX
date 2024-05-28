'use client';
import { Inter } from "next/font/google";
import dynamic from 'next/dynamic';
import React from 'react';
import { SearchContext } from "@/Components/Context/SearchContext";

const Navbar = dynamic(() => import('@/Components/Navbar/Navbar'), { ssr: false })
const inter = Inter({ subsets: ["latin"] });


export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const [searchInput, setSearchInput] = React.useState("");
    return (
        <html lang="en">
          <body className={inter.className}>
            <SearchContext.Provider value={{ searchInput, setSearchInput }}>
              <Navbar />
              {children}
            </SearchContext.Provider>
          </body>
        </html>
      );
  }