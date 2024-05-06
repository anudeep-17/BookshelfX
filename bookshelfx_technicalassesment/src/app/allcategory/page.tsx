import dynamic from 'next/dynamic';

const BookDisplayComponent = dynamic(() => import('@/Components/BookDisplayComponent/BookDisplayComponent'), { ssr: false });
const Navbar = dynamic(() => import('@/Components/Navbar/Navbar'), { ssr: false })

export default function Home() {
  return (
    <>
      <Navbar/>
      <BookDisplayComponent />
    </>
  );
}