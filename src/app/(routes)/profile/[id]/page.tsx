'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { useUsersLoader } from '@/hooks/useUsersLoader';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import FollowButton from '@/components/Aside/FollowButton';

export default function page() {
  const { loadProfile } = useUsersLoader();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState();
  const { data: session, status } = useSession();

  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (status !== 'authenticated') return;
    loadProfile({
      setLoading,
      setUser,
      id,
      authorId: session.user.id,
    });
  }, []);
  console.log(user);
  if (status === 'loading') {
    return null;
  }
  if (loading === true) {
    return null;
  }
  return (
    <MainLayout>
      <div className=" mb-24 w-full  mx-auto h-auto bg-[#131415] ">
        <div id="user-info relative">
          <div className="bg-[#6e179d] w-full h-32     inset-0 z-0" />
          <div className=" flex ">
            <Image
              className="rounded-full aspect-square object-cover absolute top-20 ml-6 border-4 border-gray-400 size-20 md:size-24 lg:size-28"
              width={115}
              height={110}
              // src="/images/character-portrait.png"
              src={user?.image || '/images/default_user.webp'}
            />
            {id === session.user.id ? (
              <button className="w-32 h-12 p-2  ml-auto relative right-0 -top-10 mr-10  rounded-3xl bg-gray-100 text-black hover:bg-gray-300">
                Edit Profile
              </button>
            ) : (
              user?.id && (
                <FollowButton
                  followedId={user.id}
                  isFollowing={user.isFollowing}
                />
              )
            )}
          </div>
          <div className=" pl-6 relative z-10 pt-12">
            <div>
              <h2 className="pb-3  text-2xl">
                {loading ? 'User' : user ? user.name : ''}
              </h2>
              <h3 className="flex   text-gray-400 py-3">
                <Calendar type="span" className="mr-2" /> Joined{' '}
                {user ? user.createdAt.substring(0, 10) : ''}
              </h3>
            </div>
            <div className="text-gray-400 pb-12">
              <span className=" text-white">
                {loading ? 0 : user?.followingCounter}
              </span>
              <span className="mr-6">&nbsp; Following</span>
              <span className="text-white">{user?.followedCounter}</span>
              &nbsp;Followers
            </div>
          </div>
        </div>
        <div className="w-full bg-green-600 flex ">
          <button
            className=" bg-yellow-400 w-1/2 text-center py-3"
            type="button"
          >
            Posts
          </button>
          <button className="bg-blue-700 w-1/2 text-center py-3" type="button">
            Likes
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
