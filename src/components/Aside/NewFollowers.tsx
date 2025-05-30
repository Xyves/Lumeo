'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';

import { useUsersLoader } from '@/hooks/useUsersLoader';
import type { FollowerType } from '@/types';

import Follower from './Follower';

export default function NewFollows() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<FollowerType[]>([]);
  const { loadUsers } = useUsersLoader();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.id) return;
    loadUsers({
      userId: session?.user.id,
      setLoading,
      setUsers,
      input: undefined,
      onlyFollowed: true,
    });
  }, [session?.user?.id, loadUsers, status]);
  const memoizedUsers = useMemo(() => users.slice(0, 10), [users]);
  if (memoizedUsers.length === 0) {
    return null;
  }
  if (status === 'loading' || loading) return null;
  return (
    <aside className=" max-w-1/4 mr-auto p-3  lg:inline-block hidden font-lunar my-auto">
      <div className="  p-4 rounded-3xl  border-2 border-purple-800 bg-[rgb(26,27,31)] text-white">
        {/* bg-[url(/images/BG_Grid2.gif)] */}
        <h2 className="sm:text-sm md:text-lg 2xl:text-xl text-[#00ffff] text-center text-nowrap">
          People you might know
        </h2>
        <div className="my-6">
          {memoizedUsers.map(user => {
            return (
              <Follower
                name={user.name}
                profile_url={user.image}
                id={user.id}
                key={user.id}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
}
