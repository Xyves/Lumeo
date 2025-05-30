'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { OrbitProgress } from 'react-loading-indicators';

import { useUsersLoader } from '@/hooks/useUsersLoader';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import FollowButton from '@/components/Aside/FollowButton';
import PostsList from '@/components/Feed/PostsList';
import { usePostLoader } from '@/hooks/usePostLoader';
import { createDeletePostHandler, logoutUser } from '@/lib/utils';
import ProfileModal from '@/components/popup/ProfileModal';
import PostsLikesToggle from '@/components/Profile/PostsLikesToggle ';
import type { PostInterface, profileUserInterface } from '@/types';

export default function Page() {
  const { loadProfile } = useUsersLoader();
  const { loadUserPosts, updateStart, loadLikedPosts } = usePostLoader();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<profileUserInterface>();
  const [modalVisible, setModalVisible] = useState(false);
  const { data: session, status } = useSession();
  const params = useParams();
  const { id } = params;
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [start, setStart] = useState<number>(0);
  const [view, setView] = useState<'posts' | 'likes'>('posts');
  const handleDeletePost = createDeletePostHandler(setPosts);

  const fixedId = Array.isArray(id) ? id[0] : id;
  useEffect(() => {
    if (view !== 'posts' || !id || !session?.user?.id) return;

    loadUserPosts({
      start,
      userId: session.user.id,
      authorId: fixedId,
      setPosts,
      setLoading,
    });
  }, [view, id, session?.user.id]);

  useEffect(() => {
    if (view !== 'likes' || !id) return;

    loadLikedPosts({
      userId: session?.user.id,
      profileId: id,
      setLoading,
      setPosts,
    });
  }, [view, session?.user.id]);

  const memoizedPosts = useMemo(() => posts, [posts]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    if (typeof id !== 'string') return;
    loadProfile({
      setLoading,
      setUser,
      id,
      authorId: session.user.id,
    });
  }, [status, id, session?.user.id]);
  if (status === 'loading') {
    return null;
  }
  return (
    <MainLayout>
      {modalVisible && user && id && (
        <ProfileModal
          modalVisible={modalVisible}
          setModalVisibleAction={setModalVisible}
          user={user}
          id={id}
          setUserAction={setUser}
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
              src={
                user?.image?.trim() ? user.image : '/images/default_user.webp'
              }
            />
            {id === session?.user.id ? (
              <div className="ml-auto flex-col flex">
                <button
                  className="w-32 h-12 p-2   relative right-0 -top-10 mr-10  rounded-3xl bg-[white] text-black hover:bg-gray-300"
                  type="button"
                  onClick={() => setModalVisible(!modalVisible)}
                >
                  Edit Profile
                </button>
                <button
                  className="w-32  bg-red-600 rounded-3xl z-50  p-2   relative  -top-10 mr-10 mt-3 active:bg-red-700"
                  type="button"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>
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
          <PostsLikesToggle view={view} setView={setView} />
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
          {Array.isArray(posts) && posts.length === 0 && !loading && (
            <div className="text-center text-gray-500 mt-4">
              No posts found.
            </div>
          )}
          {posts.length > 0 && (
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
