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
      onlyFollowed: true,
    });
  }, []);
  const memoizedUsers = useMemo(() => users, [users]);
  console.log(memoizedUsers);
  if (memoizedUsers.length === 0) {
    return null;
  }
  return (
    <aside className=" md:1/6 w-1/6 mr-auto p-3  lg:inline-block hidden font-lunar ">
      <div className="  p-4 rounded-3xl  border-2 border-purple-800 bg-[rgba(25,25,153,0.6)] text-[#00ffff]">
        {/* bg-[url(/images/BG_Grid2.gif)] */}
        <h2 className="sm:text-sm md:text-lg 2xl:text-xl text-[#99fc20] text-center text-nowrap">
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
