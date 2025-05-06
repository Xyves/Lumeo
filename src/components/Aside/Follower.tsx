'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

import FollowButton from './FollowButton';

export default function Follower({ name, profile_url, id }) {
  console.log(profile_url);
  const router = useRouter();
  return (
    <div>
      <div
        type="button"
        id={id}
        className="flex my-4 items-center"
        onClick={() => router.push(`/profile/${id}`)}
      >
        <Link
          href="/profile/id"
          className="flex rounded-3xl items-center max-w-64"
        >
          <Image
            src={profile_url || '/images/default_user.webp'}
            alt=""
            width={35}
            height={35}
            className="rounded-2xl"
          />
          <span className="ml-3 inline-block hover:underline">{name}</span>
        </Link>
        {/* </Link> */}
        <div className=" ml-auto justify-end my-auto relative text-white">
          <FollowButton followedId={id} isFollowing="false" />
        </div>
      </div>
    </div>
  );
}
