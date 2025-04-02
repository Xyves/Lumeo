import type { Metadata } from 'next';

import HomePage from '@/components/Home/HomePage';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Home Page',
};
export const Home = async () => {
  return <HomePage />;
};
