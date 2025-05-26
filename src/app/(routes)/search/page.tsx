'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import MainLayout from '@/layouts/MainLayout/MainLayout';
import SearchContainer from '@/components/Aside/SearchContainer';
import { useUsersLoader } from '@/hooks/useUsersLoader';
import SearchUserList from '@/components/Search/SearchUserList';
import type { searchUserType } from '@/types';


export default function Page() {
  const [users, setUsers] = useState<searchUserType[]>([]);
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState<boolean>();
  const { loadUsers } = useUsersLoader();
  useEffect(() => {
    if (!session?.user.id) {
      throw new Error('User ID is null');
    }
    loadUsers({
      userId: session?.user.id,
      setLoading,
      input,
      setUsers,
      onlyFollowed: false,
    });
  }, [input]);

  return (
    <MainLayout>
      <div className="w-full border-2 p-3 overflow-y-auto mb-24 mx-auto bg-[url(/images/BG_Grid2.gif)] my-4 scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 rounded-lg">
        <div className=" px-2 py-3">
          <p className="lg:text-2xl md:text-lg sm:text-sm">Search users:</p>
          <SearchContainer input={input} setInput={setInput} />
        </div>
        <SearchUserList users={users} />
      </div>
    </MainLayout>
  );
}
