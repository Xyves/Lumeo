import type { Metadata } from 'next';

import HomePage from '@/components/pages/HomePage';
import AuthLayout from '@/layouts/MainLayout/AuthLayout';
import LoginWindow from '@/components/Home/LoginForm';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Home Page',
};
export default async function Home() {
  return (
    <AuthLayout>
      <LoginWindow />
    </AuthLayout>
  );
}
