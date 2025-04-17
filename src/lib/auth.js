'use client';

import { getServerSession } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function loginIsRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/');
}

export function loginIsRequiredClient() {
  if (typeof window !== 'undefined') {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push('/');
  }
}
