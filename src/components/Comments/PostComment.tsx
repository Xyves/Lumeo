import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';

import type { PostCommentType } from '@/types';

import LikeButton from '../Feed/LikeButton';

export default function PostComment({
  text,
  isLiked,
  commentLikesCount,
  profile_url,
  id,
  userId,
  name,
}: PostCommentType) {
  return (
    <div className="flex  w-full my-4 ml-10 justify-start ">
      <div className="  ">
        <Link href="/profile/X">
          <Image
            className="!size-12 rounded-full shadow-md object-cover object-center mt-1 flex-shrink-0"
            src={profile_url || null}
            width={250}
            height={150}
            alt=""
          />
        </Link>
        {/* <div className="border-l border-b border-muted-foreground rounded-bl-3xl w-[50%] h-[28%]" /> */}
      </div>
      <div className="panel flex flex-col ml-3">
        <div className="user flex items-center">
          <Link href={`/profile/${userId}`}>
            <h2 className="hover:underline">{name} </h2>
          </Link>
          <div className="timeago text-sm text-gray-400">
            <p>&nbsp; January 24, 2025</p>
          </div>
        </div>
        <div className="content">
          <p>{text}</p>
        </div>
        <div className="buttons flex">
          {/* if session.id === user that commented - allow delete and edit */}
          <LikeButton
            type="comment"
            commentId={id}
            isLiked={isLiked}
            likeCount={commentLikesCount}
          />
        </div>
      </div>
    </div>
  );
}
