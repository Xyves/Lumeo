'use client';

import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import MainLayout from '@/layouts/MainLayout/MainLayout';
import NewFollows from '@/components/Aside/NewFollowsers';
import CreatePost from '@/components/Feed/CreatePost';
import PostsList from '@/components/Feed/PostsList';

export default function Feed() {
  const { data: session, status } = useSession();
  const [postss, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(0);
  const loaderRef = useRef(null);
  if (status === 'loading') return null;
  const posts = [
    {
      id: 'd9f3a8k1',
      name: 'User_rk3gq',
      time: Date.now(),
    },
    {
      id: '8h2k3mzl',
      name: 'User_qp1vx',
      time: Date.now(),

      profile_url: 'https://example.com/profile/k9s4d8ja',
    },
    {
      id: 'x7v2p90n',
      name: 'User_w9lek',
      time: Date.now(),

      profile_url: 'https://example.com/profile/m8c3x6vz',
    },
    {
      id: 'b3u7a4hs',
      name: 'User_tz7nm',
      time: Date.now(),

      profile_url: 'https://example.com/profile/c7h1s0gp',
    },
    {
      id: 'n2d5x3lk',
      name: 'User_vq8jt',
      time: Date.now() * 0.97,

      profile_url: 'https://example.com/profile/l0k9r2jf',
    },
  ];


  return (
    <MainLayout>
      <div className=" w-1/2 bg-[#1f1e1c] p-7 overflow-y-auto mb-24 ">
        <CreatePost />
        <PostsList posts={posts} />
      </div>
      {/* <Search /> */}
      <NewFollows />
    </MainLayout>
  );
}
