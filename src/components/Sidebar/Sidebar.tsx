'use client';

import React from 'react';
import {
  SendHorizontal,
  UserRound,
  House,
  UserRoundSearch,
  CircleUserRound,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="px-2   bg-[#171006] flex flex-col  flex-shrink justify-start ">
      <section className=" w-56 flex  ">
        <div className="flex flex-col p-2 gap-6  mx-auto">
          <Link
            href="/home"
            title="X"
            className={`${pathname === '/feed' ? 'text-purple-900' : ''} flex justify-start items-center ml-6 text-3xl rounded-md transition-colors`}
          >
            <House className="size-8" />
            <p className="overflow-visible text-xs sm:text-base truncate">
              Home
            </p>
          </Link>
          <Link
            href="/search"
            className={`${pathname === '/search' ? 'bg-green-900' : ''} flex justify-start items-center ml-6 text-3xl rounded-md transition-colors`}
          >
            <UserRoundSearch className="size-8" />
            <p className="overflow-visible text-xs sm:text-base truncate">
              Search
            </p>
          </Link>
          <Link
            href="/profile"
            className={`${pathname === '/profile' ? 'bg-green-900' : ''} flex justify-start items-center ml-6 text-3xl rounded-md transition-colors`}
          >
            <UserRound className="size-8" />
            <p className="overflow-visible text-xs sm:text-base truncate">
              Profile
            </p>
          </Link>
          <Link
            href="/create"
            className={`${pathname === '/create' ? 'bg-green-900' : ''} flex justify-start items-center ml-6 text-3xl rounded-md transition-colors`}
          >
            <SendHorizontal className="size-8" />
            <p className="overflow-visible text-xs sm:text-base truncate">
              Create Post
            </p>
          </Link>
        </div>
        {/* <ul className="w-full [&>li]:my-12 pr-12">
          <li className="flex items-center">
            <House className="size-8" />
            <p>Home</p>
          </li>
          <button className="w-full">
            <li className="flex items-center w-full">
              <p className="mr-2">
                <UserRoundSearch className="size-8" />
              </p>
              <p>Search</p>
            </li>
          </button>
          <li className="flex items-center">
            <p className="mr-2">
              <User className="size-8" />
            </p>
            <p>Profile</p>
          </li>
          <li className="flex items-center">
            <p className="mr-2">
              <SendHorizontal className="size-8" />
            </p>
            <p>Post</p>
          </li>
        </ul> */}
      </section>
      <section className="flex mt-auto">
        <div className="user-info items-end flex ml-8 mb-6">
          <button className="px-10 py-7 w-36 bg-yellow-200">
            <i />
            <p>Name</p>
          </button>
        </div>
      </section>
    </div>
  );
}
