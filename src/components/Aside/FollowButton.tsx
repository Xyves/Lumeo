'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import { useUsersLoader } from '@/hooks/useUsersLoader';

interface FollowBtnProps {
  followedId: string;
  isFollowing: boolean;
}
export default function FollowButton({
  followedId,
  isFollowing,
}: FollowBtnProps) {
  const [isFollowed, setIsFollowed] = useState(isFollowing || false);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { data: session } = useSession();
  const { changeFollowState } = useUsersLoader();

  const submitFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
    if (!session?.user.id) return;
    changeFollowState(session?.user.id, followedId, isFollowed, setLoading);

    setIsFollowed(!isFollowed);
  };
  if (loading) return null;
  return (
    <button
      className={`px-1 bg-[rgb(253,25,153)] py-2 hover:bg-[rgb(183,52,126)] rounded-2xl ${animate ? 'motion-preset-expand' : ''}`}
      onClick={e => submitFollow(e)}
      type="button"
    >
      <p className="text-md">{!isFollowed ? 'Follow' : 'Unfollow'}</p>
    </button>
  );
}
