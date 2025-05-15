'use client';

import { useEffect, useMemo, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import MainLayout from '@/layouts/MainLayout/MainLayout';
import CreatePost from '@/components/Feed/CreatePost';
import PostsList from '@/components/Feed/PostsList';
import { usePostLoader } from '@/hooks/usePostLoader';
import type { PostInterface } from '@/types';

export default function Feed() {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [hasFetched, setHasFetched] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [start, setStart] = useState<number>(0);
  const { data: session } = useSession();
  console.log(session);
  const { loadPosts, updateStart } = usePostLoader();
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const feedType = 'feed';

  useEffect(() => {
    if (start !== 0) {
      if (session && session.user) {
        delay(200);
        loadPosts({
          start,
          userId: session.user.id,
          setPosts,
          setLoading,
          setHasMore,
          feedType,
        });
      }
    }
  }, [start]);

  useEffect(() => {
    if (start === 0) {
      loadPosts({
        start: 0,
        userId: session.user.id,
        setPosts,
        setLoading,
        feedType,
      });
    }
    setHasFetched(true);
  }, []);
  const memoizedPosts = useMemo(() => posts, [posts]);

  return (
    <MainLayout>
      <div className=" w-full  p-7 overflow-y-auto  mr-auto max-h-[80%]">
        {/* bg-[#1f1e1c] */}
        <CreatePost setPosts={setPosts} />

        {loading && (
          <div className="loading-spinner flex justify-center">
            <OrbitProgress variant="track-disc" speedPlus={2} easing="linear" />
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
          <PostsList
            memoizedPosts={memoizedPosts}
            setStart={setStart}
            handleUpdateStart={updateStart}
          />
        )}
      </div>
      {/* <Search /> */}
    </MainLayout>
  );
}
