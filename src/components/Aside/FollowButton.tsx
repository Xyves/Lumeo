'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import { useUsersLoader } from '@/hooks/useUsersLoader';

export default function FollowButton({ followedId }) {
  const [isFollowed, setIsFollowed] = useState(false);
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
      className="px-2 bg-[rgb(253,25,153)] hover:bg-[rgb(183,52,126)] rounded-2xl flex justify-end ml-auto"
      onClick={e => submitFollow(e)}
    >
      <div>{!isFollowed ? 'Follow' : 'Unfollow'}</div>
    </button>
  );
}
