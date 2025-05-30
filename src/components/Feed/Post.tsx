/* eslint-disable camelcase */
import React from 'react';

import 'primeicons/primeicons.css';

import Zoom from 'react-medium-image-zoom';
import '@/styles/zoom.css';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { usePostLoader } from '@/hooks/usePostLoader';
import type { PostComponentInterface } from '@/types';

import LikeButton from './LikeButton';
import CommentsButton from './commentButton';

TimeAgo.addDefaultLocale(en);
export default function Post({
  id,
  authorId,
  authorName,
  profile_image,
  content,
  post_image,
  date,
  innerRef,
  likeCount,
  commentCount,
  isLiked,
  deletePost,
}: PostComponentInterface) {
  const { deletePostFromDb } = usePostLoader();

  const { data: session } = useSession();
  // console.log('post author Id:', authorId);
  const handleDeletePost = async () => {
    // console.log('Trying to delete post', id, authorId, session?.user.id);
    await deletePostFromDb({ id, authorId, userId: session?.user.id });
    await deletePost(id);
  };
  const router = useRouter();
  return (
    <div
      className="flex-col flex [&>section]:px-4 mb-6 last:mb-24 border-[#5b34ac] border-2 rounded-lg   bg-[rgba(0,0,0,0.6)]
      "
      data-user-id={id}
      ref={innerRef}
    >
      <div className="cursor-pointer rounded-lg">
        <section className="  w-full flex-row flex items-center px-3 py-2 md:p-3 rounded-t-md">
          <div className="w-12 h-12  relative flex-col flex">
            <Link
              href={`/profile/${authorId}`}
              onClick={e => e.stopPropagation()}
            >
              <Image
                onClick={e => e.stopPropagation()}
                src={profile_image || '/images/default_user.webp'}
                fill
                alt="profile image"
                className="rounded-full aspect-square object-cover absolute border-[1px] border-gray-500"
              />
            </Link>
          </div>
          <Link
            href={`/profile/${authorId}`}
            onClick={e => e.stopPropagation()}
          >
            <p className="ml-2 lg:text-xl  text-lg  hover:underline font-bold font-courier text-[#8b28cd]">
              {authorName}
            </p>
          </Link>
          <div className="relative group inline-block w-fit">
            <p className="lg:text-xs text-xs text-purple-300">
              &nbsp;
              {date && <ReactTimeAgo date={new Date(date)} locale="en-US" />}
            </p>
            <div className="absolute bottom-full mb-1 hidden w-max rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block z-10">
              {new Date(date).toLocaleString()}
            </div>
          </div>

          {authorId === session?.user.id ? (
            <button
              onClick={handleDeletePost}
              className="pi ml-auto pi-trash text-red-700 size-16 active:text-red-900 hover:text-red-500"
              type="button"
            />
          ) : null}
        </section>
        <section className="w-full flex-col flex pb-5 md:pb-0 tracking-wider">
          <div
            role="button"
            onClick={() => router.push(`/post/${id}`)}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                router.push(`/post/${id}`);
              }
            }}
            className="outline-none"
          >
            <p
              className=" py-2 md:py-6 ml-6 px-2  
          text-[#F1E3E4x]
           border-[#14a014]  "
            >
              {content}
            </p>
            {post_image ? (
              <Zoom>
                <div
                  className=" w-full flex items-center overflow-hidden mb-3 md:px-3 px-2 justify-center"
                  role="button"
                  tabIndex={0}
                  onClick={e => e.stopPropagation()}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                >
                  <img src={post_image} alt="" className="  object-contain" />
                </div>
              </Zoom>
            ) : (
              ''
            )}
          </div>
        </section>
        <section
          className="h-1/4  py-3 w-full flex-row flex items-center pl-6 rounded-b-md bg-[rgb(68,12,124)]"
          role="button"
          tabIndex={0}
          onClick={e => e.stopPropagation()}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <LikeButton
            likeCount={likeCount}
            postId={id}
            isLiked={isLiked}
            type="post"
          />
          <CommentsButton commentsCount={commentCount} id={id} />
        </section>
      </div>
    </div>
  );
}
