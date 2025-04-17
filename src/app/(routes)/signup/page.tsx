import React from 'react';

import SignUp from '@/components/pages/SignUp';
import AuthLayout from '@/layouts/MainLayout/AuthLayout';
import HomeContent from '@/components/Home/HomeContent';
import RegisterForm from '@/components/Home/RegisterForm';

export default function SignUpPage() {
  return (
    <AuthLayout>
      <div className="lg:flex-row  max-sm:flex-col  md:flex-row flex w-full min-h-screen">
        <RegisterForm />
        <HomeContent />
      </div>
    </AuthLayout>
  );
}
