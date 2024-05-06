import dynamic from 'next/dynamic';

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