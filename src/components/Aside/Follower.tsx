'use client';

/* eslint-disable camelcase */

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

import FollowButton from './FollowButton';

interface FollowerInterface {
  name: string;
  profile_url: string;
  id: string;
}
export default function Follower({ name, profile_url, id }: FollowerInterface) {
  console.log(profile_url);
  const router = useRouter();
  return (
    <div className="">
      <button
        type="button"
        id={id}
        className="flex my-4 items-center w-full justify-between"
        onClick={() => router.push(`/profile/${id}`)}
      >
        <Link href={`/profile/${id}`} className="flex rounded-3xl items-center">
          <Image
            src={profile_url || '/images/default_user.webp'}
            alt=""
            width={35}
            height={35}
            className="rounded-2xl"
          />
          <span className="ml-2 text-sm hover:underline">{name}</span>
        </Link>

        <div className="ml-auto my-auto">
          <FollowButton followedId={id} isFollowing={false} />
        </div>
      </button>
    </div>
  );
}
