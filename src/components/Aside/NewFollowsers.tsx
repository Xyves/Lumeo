'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';

import { useUsersLoader } from '@/hooks/useUsersLoader';

import Follower from './Follower';

export default function NewFollows() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { loadUsers } = useUsersLoader();
  const { data: session } = useSession();

  useEffect(() => {
    loadUsers({
      userId: session.user.id,
      setLoading,
      setUsers: users => setUsers(users.slice(0, 10)),
      input: null,
    });
  }, []);
  const memoizedUsers = useMemo(() => users, [users]);
  console.log(memoizedUsers);
  return (
    <aside className="w-72   mr-auto p-3 sm:hidden lg:inline-block">
      <div className="border-2  p-4 rounded-3xl">
        <h2 className="sm:text-sm md:text-lg 2xl:text-xl ">
          People you might know
        </h2>
        <div className="my-6">
          {memoizedUsers.map(follower => {
            return (
              <Follower
                name={follower.name}
                profile_url={follower.image}
                id={follower.id}
                key={follower.id}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
}
