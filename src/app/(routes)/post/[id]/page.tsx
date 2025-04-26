'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { format } from 'date-fns';

import MainLayout from '@/layouts/MainLayout/MainLayout';
import NewFollows from '@/components/Aside/NewFollowsers';
import FollowButton from '@/components/Aside/FollowButton';
import CommentsButton from '@/components/Feed/commentButton';
import LikeButton from '@/components/Feed/LikeButton';
import { usePostLoader } from '@/hooks/usePostLoader';

TimeAgo.addDefaultLocale(en);
export default function page() {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const params = useParams();
  const { id } = params;
  const { loadPost } = usePostLoader();
  useEffect(() => {
    loadPost({ setPost, postId: id, setLoading, userId: session.user.id });
  }, []);
  const memoizedPost = useMemo(() => post, [post]);
  if (loading || !post) return <div>Loading...</div>;
  console.log(post);
  return (
    <MainLayout>
      <div className=" mb-24 w-2/5  mx-auto h-auto bg-[#131415] ">
        <div className="ml-10">
          <div className="user flex items-center">
            <Image
              width={100}
              height={100}
              className="rounded-full aspect-square object-cover   border-4 border-gray-400"
              src={post.author?.image || '/images/character-portrait.png'}
            />
            <h2>{post.author.name}</h2>
          </div>
          <div className="content py-3 ml-4">{post.content}</div>
          <div className="time">
            {post.date && format(new Date(post.date), 'dd.MM.yyyy HH:mm')}
          </div>
          <div className="buttons flex justify-around w-3/4 items mx-auto bg-gray-500 p-6">
            <LikeButton
              likeCount={post.likeCount}
              postId={post.id}
              isLiked={post.isLiked}
            />
            <CommentsButton
              commentsCount={post.commentCount}
              postId={post.id}
            />
          </div>
        </div>
        {/* The post id:{id} */}
      </div>
      <NewFollows />
    </MainLayout>
  );
}
