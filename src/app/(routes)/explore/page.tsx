'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { OrbitProgress } from 'react-loading-indicators';

import MainLayout from '@/layouts/MainLayout/MainLayout';
import { LoadPostsArgs, usePostLoader } from '@/hooks/usePostLoader';
import PostsList from '@/components/Feed/PostsList';
import CreatePost from '@/components/Feed/CreatePost';
import { createDeletePostHandler } from '@/lib/utils';
import { PostInterface } from '@/types';

export default function Explore() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [start, setStart] = useState<number>(0);
  const { data: session } = useSession();
  const { loadPosts, updateStart } = usePostLoader();
  const feedType = 'explore';

  useEffect(() => {
    if (start !== 0) {
      if (session && session.user) {
        // delay(200);
        loadPosts({
          start,
          userId: session.user.id,
          setPosts,
          setLoading,
          feedType,
        } as LoadPostsArgs);
      }
    }
  }, [start]);

  useEffect(() => {
    loadPosts({
      start: 0,
      userId: session?.user.id,
      setPosts,
      setLoading,
      feedType,
    } as LoadPostsArgs);
  }, []);
  const handleDeletePost = createDeletePostHandler(setPosts);

  const memoizedPosts = useMemo(() => posts, [posts]);
  return (
    <MainLayout>
      <div className=" w-full  p-7 overflow-y-auto my-4 mx-auto scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 bg-[rgba(0,0,0,0.6)] max-h-[95%]">
        <CreatePost setPosts={setPosts} />
        <PostsList
          memoizedPosts={memoizedPosts}
          setStart={setStart}
          onDelete={handleDeletePost}
          handleUpdateStart={updateStart}
        />
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
