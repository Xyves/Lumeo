'use client';

import 'primeicons/primeicons.css';
import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import { boolean } from 'zod';
import { useSession } from 'next-auth/react';

import { usePostLoader } from '@/hooks/usePostLoader';

export default function LikeButton({
  likeCount,
  postId,
  isLiked,
}: {
  likeCount: number;
  postId: string;
  isLiked: boolean;
}) {
  const { data: session } = useSession();
  const { updateLikeStatus } = usePostLoader();
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(likeCount);
  const [liked, setLiked] = useState(isLiked);
  const changeLike = async () => {
    try {
      updateLikeStatus({ postId, userId: session.user.id, setLoading });
      setLikesCount(count => count + (liked ? -1 : 1));
      setLiked(!liked);
    } catch (err) {
      console.error('Failed to update like status:', err);
    }
  };
  return (
    <button
      className="flex items-center"
      onClick={e => {
        e.stopPropagation();
        changeLike();
      }}
      type="button"
    >
      {!liked ? (
        <span className="pi pi-heart text-xl" />
      ) : (
        <span className="pi pi-heart-fill text-xl" />
      )}
      <span className="pl-1">{likesCount}</span>
    </button>
  );
}
