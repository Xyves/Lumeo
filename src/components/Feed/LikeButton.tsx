'use client';

import 'primeicons/primeicons.css';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import { usePostLoader } from '@/hooks/usePostLoader';

type LikeType = 'post' | 'comment';
export default function LikeButton({
  type,
  likeCount,
  postId,
  commentId,
  isLiked,
}: {
  type?: LikeType;
  likeCount: number;
  postId?: string;
  commentId?: string;
  isLiked: boolean;
}) {
  const { data: session } = useSession();
  const { updateLikeStatus } = usePostLoader();
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(likeCount);
  const [liked, setLiked] = useState(isLiked);
  const changeLike = async () => {
    if (!session?.user.id) return;
    try {
      if (type === 'post') {
        updateLikeStatus({
          postId,
          userId: session.user.id,
          setLoading,
        });
      } else if (type === 'comment') {
        updateLikeStatus({
          userId: session.user.id,
          setLoading,
          commentId,
        });
      }
      setLikesCount(count => count + (liked ? -1 : 1));
      setLiked(!liked);
    } catch (err) {
      console.error('Failed to update like status:', err);
    }
  };
  return (
    <button
      className="flex items-center "
      onClick={e => {
        e.stopPropagation();
        changeLike();
      }}
      type="button"
    >
      <span
        className={`pi ${!liked ? 'pi-heart' : 'pi-heart-fill'} 
              text-xl text-red-800
        hover:text-red-500 cursor-pointer
              `}
      />
      <span className="pl-1 ">{likesCount}</span>
    </button>
  );
}
