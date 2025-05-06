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
import FollowButton from '@/components/Aside/FollowButton';
import CommentsButton from '@/components/Feed/commentButton';
import LikeButton from '@/components/Feed/LikeButton';
import { usePostLoader } from '@/hooks/usePostLoader';
import CommentsList from '@/components/Comments/CommentsList';
import CreateComments from '@/components/Comments/CreateComments';
import { useCommentsLoader } from '@/hooks/useCommentsLoader';

TimeAgo.addDefaultLocale(en);
export default function page() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const params = useParams();
  const { id } = params;
  const { loadPost } = usePostLoader();
  const { loadComments } = useCommentsLoader();
  useEffect(() => {
    loadPost({ setPost, postId: id, setLoading, userId: session.user.id });
    loadComments({
      setComments,
      postId: id,
      setLoading,
      userId: session.user.id,
    });
  }, []);
  const memoizedComments = useMemo(() => comments, [comments]);
  if (loading || !post) return <div>Loading...</div>;
  console.log(post);
  return (
    <MainLayout>
      <div className=" mb-24 w-full  mx-auto h-auto  bg-[#131415] ">
        <div className="ml-10">
          <div className="user flex items-start">
            <Image
              width={100}
              height={100}
              className="rounded-full aspect-square object-cover   border-4 border-gray-400"
              src={post.author?.image || '/images/character-portrait.png'}
            />
            <h2 className="lg:text-2xl md:text-xl sm:text-lg">
              {post.author.name}
            </h2>
          </div>
          <div className="content py-3  mb-3 lg:text-xl md:text-lg sm:text-md">
            {post.content}
          </div>
          <div className="time mb-6">
            {post.date && format(new Date(post.date), 'dd.MM.yyyy HH:mm')}
          </div>
          <div className="buttons flex justify-around   mr-10 border-gray-500 border-y-4 py-6">
            <LikeButton
              likeCount={post.likeCount}
              postId={post.id}
              isLiked={post.isLiked}
              type="post"
            />

            <CommentsButton
              commentsCount={post.commentCount}
              postId={post.id}
            />
          </div>
        </div>
        {/* The post id:{id} */}
        <CreateComments postId={post.id} setComments={setComments} />
        <CommentsList memoizedComments={memoizedComments} />
      </div>
    </MainLayout>
  );
}
