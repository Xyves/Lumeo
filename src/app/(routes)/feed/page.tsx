'use client';

import { useEffect, useMemo, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import MainLayout from '@/layouts/MainLayout/MainLayout';
import CreatePost from '@/components/Feed/CreatePost';
import PostsList from '@/components/Feed/PostsList';
import { LoadPostsArgs, usePostLoader } from '@/hooks/usePostLoader';
import type { PostInterface } from '@/types';
import { createDeletePostHandler } from '@/lib/utils';

export default function Feed() {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [hasFetched, setHasFetched] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [start, setStart] = useState<number>(0);
  const { data: session } = useSession();
  console.log(session);
  const { loadPosts, updateStart } = usePostLoader();
  const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
  const feedType = 'feed';
  const handleDeletePost = createDeletePostHandler(setPosts);

  useEffect(() => {
    if (start !== 0) {
      if (session && session.user) {
        delay(100);
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
        userId: session?.user?.id,
        setPosts,
        setLoading,
        feedType,
      } as LoadPostsArgs);
    }
    setHasFetched(true);
  }, []);
  const memoizedPosts = useMemo(() => posts, [posts]);

  return (
    <MainLayout>
      <div className=" w-full  p-7 overflow-y-auto  mr-auto max-h-[95%] scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300">
        {/* bg-[#1f1e1c] */}
        <CreatePost setPosts={setPosts} />
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
            onDelete={handleDeletePost}
            handleUpdateStart={updateStart}
          />
        )}
        {loading && (
          <div className="loading-spinner flex justify-center">
            <OrbitProgress
              variant="track-disc"
              speedPlus={2}
              easing="linear"
              color={'blue'}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
