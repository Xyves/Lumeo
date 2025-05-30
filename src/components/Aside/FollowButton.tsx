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
  const { data: session } = useSession();
  const { changeFollowState } = useUsersLoader();

  const submitFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!session?.user.id) return;
    changeFollowState(
      session?.user.id,
      followedId,
      isFollowed,
      setIsFollowed,
      setLoading
    );

    e.stopPropagation();
    setIsFollowed(prev => !prev);
  };
  if (loading) return null;
  return (
    <button
      className="px-1 bg-[rgb(253,25,153)] py-2 hover:bg-[rgb(183,52,126)] rounded-2xl s"
      onClick={e => submitFollow(e)}
      type="button"
    >
      <div className="text-md">{!isFollowed ? 'Follow' : 'Unfollow'}</div>
    </button>
  );
}
