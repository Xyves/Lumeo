'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Calendar, CircleX, PenLine } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { OrbitProgress } from 'react-loading-indicators';
import type { z } from 'zod';

import { usePopup } from '@/context/PopupContext';
import { useUsersLoader } from '@/hooks/useUsersLoader';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import FollowButton from '@/components/Aside/FollowButton';
import PostsList from '@/components/Feed/PostsList';
import { usePostLoader } from '@/hooks/usePostLoader';
import type { PostInterface } from '@/types';
import { createDeletePostHandler } from '@/lib/utils';
import ProfileModal from '@/components/popup/ProfileModal';

export default function Page() {
  const { loadProfile } = useUsersLoader();
  const { loadUserPosts, updateStart, loadLikedPosts } = usePostLoader();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState();
  const [view, setView] = useState<'posts' | 'likes'>('posts');
  const [modalVisible, setModalVisible] = useState(false);
  const { data: session, status } = useSession();
  const params = useParams();
  const { id } = params;
  const [hasFetched, setHasFetched] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [start, setStart] = useState<number>(0);

  const handleDeletePost = createDeletePostHandler(setPosts);

  // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if (view !== 'posts') return;

    loadUserPosts({
      start: 0,
      userId: session.user.id,
      authorId: id,
      setPosts,
      setLoading,
    });
    setHasFetched(true);
  }, [view]);

  useEffect(() => {
    if (view !== 'likes') return;

    loadLikedPosts({
      userId: session.user.id,
      setLoading,
      setPosts,
      profileId: id,
    });
    setHasFetched(true);
  }, [view]);
  const memoizedPosts = useMemo(() => posts, [posts]);
  useEffect(() => {
    if (status !== 'authenticated') return;
    loadProfile({
      setLoading,
      setUser,
      id,
      authorId: session.user.id,
    });
  }, []);
  console.log('displayed user:', user);
  if (status === 'loading') {
    return null;
  }
  return (
    <MainLayout>
      {modalVisible && (
        <ProfileModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          user={user}
          id={id}
          setUser={setUser}
        />
      )}

      <div
        className={` mb-24 w-full  mx-auto h-full bg-[#131415]  overflow-y-auto max-h-[95%] rounded-md border-purple-400 border-[1px] border-solid  relative ${modalVisible ? 'filter blur-sm' : ''}`}
      >
        <div id="user-info relative">
          <div className="bg-[#6e179d] w-full h-28     inset-0 z-0" />
          <div className=" flex h-6">
            <Image
              className="rounded-full aspect-square object-cover mx-6 border-4 border-gray-400 size-20 md:size-24 lg:size-28 
                 -translate-y-1/2"
              width={115}
              alt="user profile image"
              height={110}
              src={user?.image || '/images/default_user.webp'}
            />
            {id === session?.user.id ? (
              <button
                className="w-32 h-12 p-2  ml-auto relative right-0 -top-10 mr-10  rounded-3xl bg-[white] text-black hover:bg-gray-300"
                type="button"
                onClick={() => setModalVisible(!modalVisible)}
              >
                Edit Profile
              </button>
            ) : (
              user?.id && (
                <div className="relative right-0 ml-auto mt-5  -top-10 mr-10  rounded-3xl">
                  <FollowButton
                    followedId={user.id}
                    isFollowing={user.isFollowing}
                  />
                </div>
              )
            )}
          </div>
          <div className=" pl-6 relative z-10 pt-12">
            <div>
              <h2 className="pb-3  text-2xl">
                {loading ? '' : user ? user.name : ''}
              </h2>
              <h3 className="flex   text-gray-400 py-3">
                <Calendar type="span" className="mr-2" /> Joined{' '}
                {user?.createdAt ? user.createdAt.substring(0, 10) : ''}
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
        <div className={`w-full bg-green-600 flex `}>
          <button
            className={` bg-yellow-400 w-1/2 text-center py-3 ${view === 'posts' ? 'border-2 active:bg-yellow-600 hover:bg-yellow-300' : ''}`}
            type="button"
            onClick={e => setView('posts')}
          >
            Posts
          </button>
          <button
            className={`bg-blue-700 w-1/2 text-center py-3 ${view === 'likes' ? 'border-2  active:bg-blue-800 hover:bg-blue-700' : ''}`}
            type="button"
            onClick={e => setView('likes')}
          >
            Likes
          </button>
        </div>
        <div className="flex flex-col overflow-y-auto  px-4 mt-3">
          {loading && (
            <div className="loading-spinner flex justify-center">
              <OrbitProgress
                variant="track-disc"
                speedPlus={2}
                easing="linear"
                color="blue"
              />
            </div>
          )}
          {Array.isArray(posts) &&
            hasFetched &&
            posts.length === 0 &&
            !loading && (
              <div className="text-center text-gray-500 mt-4">
                No posts found.
              </div>
            )}
          {hasFetched && posts.length > 0 && (
            <div className="mt-10">
              <PostsList
                memoizedPosts={memoizedPosts}
                setStart={setStart}
                handleUpdateStart={updateStart}
                onDelete={handleDeletePost}
              />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
