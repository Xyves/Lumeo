'use client';

import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import AuthLayout from '@/layouts/MainLayout/AuthLayout';
import LoginWindow from '@/components/Home/LoginForm';
import HomeContent from '@/components/Home/HomeContent';

export const dynamic = 'force-dynamic';
// export const metadata: Metadata = {
//   title: 'Login Page',
// };
export default function Home() {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status !== 'unauthenticated') {
      router.push('/feed');
    }
  }, [status, router]);
  // console.log(session);
  if (status === 'loading') {
    return null;
  }
  return (
    <AuthLayout>
      <LoginWindow />
      <HomeContent />
    </AuthLayout>
  );
}
