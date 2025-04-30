import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';

import LikeButton from '../Feed/LikeButton';

export default function PostComment({
  text,
  isLiked,
  commentLikesCount,
  id,
  userId,
  name,
}) {
  const { data: session } = useSession();
  return (
    <div className="flex  w-full my-10 justify-center">
      <div className="   ">
        <Link href="/profile/X">
          <Image
            className="!size-12 rounded-full shadow-md object-cover object-center mt-1 flex-shrink-0"
            src="/images/default_user.webp"
            width={250}
            height={150}
            alt=""
          />
        </Link>
        {/* <div className="border-l border-b border-muted-foreground rounded-bl-3xl w-[50%] h-[28%]" /> */}
      </div>
      <div className="panel flex flex-col ml-3">
        <div className="user ">
          <h2>{name}</h2>
          <div className="timeago">
            <p>January 24, 2025</p>
          </div>
        </div>
        <div className="content">
          <p>{text}</p>
        </div>
      </div>
      <div className="buttons">
        {/* if session.id === user that commented - allow delete and edit */}
        <LikeButton
          type="comment"
          commentId={id}
          isLiked={isLiked}
          likeCount={commentLikesCount}
        />
      </div>
    </div>
  );
}
