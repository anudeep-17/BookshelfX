import dynamic from 'next/dynamic';

const BookDisplayComponent = dynamic(() => import('@/Components/BookDisplayComponent/BookDisplayComponent'), { ssr: false });

export default function Home() {
  return (
    <BookDisplayComponent />
  );
}