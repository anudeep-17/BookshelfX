import dynamic from 'next/dynamic';

const Dashboard_Home = dynamic(() => import('@/Components/Dashboard/Dashboard_Home'), { ssr: false })

export default function Home() {
  return (
    <Dashboard_Home />
  );
}