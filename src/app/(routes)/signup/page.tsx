'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import AuthLayout from '@/layouts/MainLayout/AuthLayout';
import HomeContent from '@/components/Home/HomeContent';
import RegisterForm from '@/components/Home/RegisterForm';

export default function SignUpPage() {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status !== 'unauthenticated') {
      router.push('/feed');
    }
  }, [status, router]);
  return (
    <AuthLayout>
      <div className="lg:flex-row  max-sm:flex-col  md:flex-row flex w-full min-h-screen">
        <RegisterForm />
        <HomeContent />
      </div>
    </AuthLayout>
  );
}
