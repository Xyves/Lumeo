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
  console.log('is followed status is:', isFollowed);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { changeFollowState } = useUsersLoader();

  const submitFollow = e => {
    changeFollowState(
      session.user.id,
      followedId,
      isFollowed,
      setIsFollowed,
      setLoading
    );

    e.stopPropagation();
    setIsFollowed(prev => !prev);
  };
  return (
    <button
      className="px-1 bg-[rgb(253,25,153)] py-2 hover:bg-[rgb(183,52,126)] rounded-2xl flex justify-end ml-auto"
      onClick={e => submitFollow(e)}
    >
      <div className="text-md">{isFollowed ? 'Follow' : 'Unfollow'}</div>
    </button>
  );
}
