import { Inter } from "next/font/google";

import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('@/Components/Navbar/Navbar'), { ssr: false })
const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <html lang="en">
          <body className={inter.className}>
            <Navbar />
            {children}
          </body>
        </html>
      );
  }