'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

import MainLayout from '@/layouts/MainLayout/MainLayout';
import CommentsButton from '@/components/Feed/commentButton';
import LikeButton from '@/components/Feed/LikeButton';
import { usePostLoader } from '@/hooks/usePostLoader';
import CommentsList from '@/components/Comments/CommentsList';
import CreateComments from '@/components/Comments/CreateComments';
import { useCommentsLoader } from '@/hooks/useCommentsLoader';
import { usePopup } from '@/context/PopupContext';

TimeAgo.addDefaultLocale(en);
export default function Page() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const params = useParams();
  const { id } = params;
  const { loadPost, deletePostFromDb } = usePostLoader();
  const { loadComments } = useCommentsLoader();
  const { showPopup } = usePopup();
  const router = useRouter();
  console.log('post author:', post);
  useEffect(() => {
    loadPost({ setPost, postId: id, setLoading, userId: session?.user.id });
    loadComments({
      setComments,
      postId: id,
      setLoading,
      userId: session?.user.id,
    });
  }, []);
  console.log('Current post:', post);
  const memoizedComments = useMemo(() => comments, [comments]);
  const handleDeletePost = async () => {
    showPopup({ isVisible: true, text: 'Loading', type: 'loading' });
    if (!id || !post?.author?.id || !session?.user?.id) {
      return;
    }
    const deleted = await deletePostFromDb({
      id,
      authorId: post.author.id,
      userId: session.user.id,
    });
    if (deleted) {
      showPopup({ isVisible: true, text: 'success', type: 'Post deleted' });
    } else {
      showPopup({ isVisible: true, text: 'error', type: 'Error deleting' });
    }
    setTimeout(() => {
      showPopup({
        isVisible: false,
        text: '',
        type: undefined,
      });
      router.push('/feed');
    }, 2000);
  };
  if (loading || !post) return <div>Loading...</div>;

  return (
    <MainLayout>
      <div className=" mb-24 w-full  mx-auto h-auto overflow-y-auto bg-[#131415] mt-10 pb-6 overflow-x-hidden">
        <div className="mx-10">
          <div className="user flex items-center my-auto py-4">
            <Image
              width={70}
              height={70}
              alt="author avatar"
              className="rounded-full aspect-square object-cover   border-4 border-gray-400"
              src={post.author?.image || '/images/default_user.webp'}
            />
            <h2 className="lg:text-2xl md:text-xl sm:text-lg flex items-center ml-2">
              {post.author.name}
            </h2>
            {post.author.id === session.user.id ? (
              <button
                onClick={handleDeletePost}
                className="pi ml-auto pi-trash text-red-700 size-16 active:text-red-900 hover:text-red-500"
              />
            ) : null}
          </div>
          <div className="content py-3  mb-3 lg:text-xl md:text-lg sm:text-md">
            {post.content}
          </div>
          <div className="h-full w-full ">
            <Image
              src={post?.image_url}
              alt="content image"
              objectFit="contain"
              width={800}
              height={500}
              className=""
            />
          </div>
          <div className="relative group inline-block w-fit">
            <p className="lg:text-sm text-purple-300">
              {post.date && (
                <ReactTimeAgo date={new Date(post.date)} locale="en-US" />
              )}
            </p>
            <div className="absolute bottom-full mb-1 hidden w-max rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block z-10">
              {new Date(post.date).toLocaleString()}
            </div>
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
