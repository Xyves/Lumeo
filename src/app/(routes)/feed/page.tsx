'use client';

import { useEffect, useMemo, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import MainLayout from '@/layouts/MainLayout/MainLayout';
import NewFollows from '@/components/Aside/NewFollowsers';
import CreatePost from '@/components/Feed/CreatePost';
import PostsList from '@/components/Feed/PostsList';
import { usePostLoader } from '@/hooks/usePostLoader';
import type { PostInterface, SessionInterface } from '@/types';

export default function Feed() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [start, setStart] = useState<number>(0);
  const { data: session } = useSession();
  console.log(session);
  const pathname = usePathname();
  const { loadPosts, updateStart } = usePostLoader();
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
  useEffect(() => {
    if (start !== 0) {
      if (session && session.user) {
        delay(200);
        loadPosts({
          start,
          userId: session.user.id,
          setPosts,
          setLoading,
        });
      }
    }
  }, [start]);

  useEffect(() => {
    loadPosts({
      start: 0,
      userId: session.user.id,
      setPosts,
      setLoading,
    });
  }, []);

  const memoizedPosts = useMemo(() => posts, [posts]);

  return (
    <MainLayout>
      <div className=" w-2/5 bg-[#1f1e1c] p-7 overflow-y-auto mb-24 mx-auto">
        <CreatePost setPosts={setPosts} />
        <PostsList
          memoizedPosts={memoizedPosts}
          setStart={setStart}
          handleUpdateStart={updateStart}
        />
        {loading && (
          <div className="loading-spinner flex justify-center">
            <OrbitProgress variant="track-disc" speedPlus={2} easing="linear" />
          </div>
        )}
      </div>
      <NewFollows />
      {/* <Search /> */}
    </MainLayout>
  );
}
