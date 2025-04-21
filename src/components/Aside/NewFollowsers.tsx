import Link from 'next/link';
import React from 'react';

import Follower from './Follower';

export default function NewFollows() {
  const followers = [
    {
      name: 'Alice Johnson',
      profile_url: 'https://randomuser.me/api/portraits/men/61.jpg',
      id: '1a2b3c',
    },
    {
      name: 'Bob Smith',
      profile_url: 'https://randomuser.me/api/portraits/men/27.jpg',
      id: '4d5e6f',
    },
    {
      name: 'Charlie Brown',
      profile_url: 'https://randomuser.me/api/portraits/men/35.jpg',
      id: '7g8h9i',
    },
    {
      name: 'Diana Prince',
      profile_url: 'https://randomuser.me/api/portraits/men/74.jpg',
      id: '0j1k2l',
    },
    {
      name: 'Evan Wright',
      profile_url: 'https://randomuser.me/api/portraits/men/7.jpg',
      id: '3m4n5o',
    },
    {
      name: 'Ombeline Eleutherius',
      profile_url: 'https://randomuser.me/api/portraits/men/11.jpg',
      id: '3he4n5o',
    },
    {
      name: 'Zé Manel Angela',
      profile_url: 'https://randomuser.me/api/portraits/women/12.jpg',
      id: '3m4gen5o',
    },
    {
      name: 'Dianna Taygete',
      profile_url: 'https://randomuser.me/api/portraits/men/13.jpg',
      id: '3mkj4n5o',
    },
  ];
  return (
    <aside className="w-72   mr-auto p-3 sm:hidden lg:inline-block">
      <div className="border-2  p-4 rounded-3xl">
        <h2 className="sm:text-sm md:text-lg 2xl:text-xl ">
          People you might know
        </h2>
        <div className="my-6">
          {followers.map(follower => {
            return (
              <Follower
                name={follower.name}
                profile_url={follower.profile_url}
                id={follower.id}
                key={follower.id}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
}
