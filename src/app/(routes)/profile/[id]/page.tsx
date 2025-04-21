'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useUsersLoader } from '@/hooks/useUsersLoader';

export default function page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState();
  const params = useParams();
  const { loadProfile } = useUsersLoader();
  const { id } = params;
  useEffect(() => {
    loadProfile({
      setLoading,
      setUser,
      id,
    });
    console.log(user);
  }, []);

  return <div />;
}
