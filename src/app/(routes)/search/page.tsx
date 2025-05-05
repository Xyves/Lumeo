'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import MainLayout from '@/layouts/MainLayout/MainLayout';
import SearchContainer from '@/components/Aside/SearchContainer';
import { useUsersLoader } from '@/hooks/useUsersLoader';
import SearchUserList from '@/components/Search/SearchUserList';

export default function route() {
  const [users, setUsers] = useState();
  const { data: session } = useSession();
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState<boolean>();
  const { loadUsers } = useUsersLoader();
  useEffect(() => {
    loadUsers({ userId: session.user.id, setLoading, input, setUsers });
    console.log(users);
  }, [input]);

  return (
    <MainLayout>
      <div className="w-full border-4 p-3 overflow-y-auto mb-24 mx-auto bg-[url(/images/BG_Grid2.gif)]">
        <div className=" px-2 py-3">
          <p className="lg:text-2xl md:text-lg sm:text-sm">Search users:</p>
          <SearchContainer input={input} setInput={setInput} />
        </div>
        <SearchUserList users={users} />
      </div>
    </MainLayout>
  );
}
