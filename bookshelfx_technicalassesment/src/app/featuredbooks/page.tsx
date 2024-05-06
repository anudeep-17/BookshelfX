import dynamic from 'next/dynamic';

const FeaturedBookComponent = dynamic(() => import('@/Components/FeaturedBookComponent/FeaturedBookComponent'), { ssr: false });

export default function Home() {
  return (
    <FeaturedBookComponent/>
  );
}