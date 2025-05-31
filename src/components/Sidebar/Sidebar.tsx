'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  SendHorizontal,
  UserRound,
  House,
  UserRoundSearch,
  EllipsisVertical,
  User,
  Telescope,
  Plus,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { useTargetRef } from '@/context/RefContext';

import AccountDropdown from './AccountDropdown';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { targetRef } = useTargetRef();
  const { data: session, status } = useSession();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollCallback = () => {
    const { current } = targetRef;
    if (pathname !== '/feed') {
      router.push('/feed');
    } else {
      current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  // Green border-[#14a014]
  // yellow bg bg-[rgb(230,230,0,0.98)]
  if (status === 'loading') return null;

  return (
    <>
      <div className=" flex-col relative hidden md:flex sm:ml-0 lg:ml-20 sm:mr-2 lg:mr-10 h-screen  opacity-95  bg-[rgb(28_29_33)]  text-purple-900">
        <div className="flex flex-col p-3 gap-3 md:px-0 2xl:px-6 flex-1 px-2 font-lunar  tracking-tight [&>p]:hover:underline mt-10">
          <Link
            href="/feed"
            title="Feed Page"
            className={`${pathname === '/feed' ? 'text-[#00ffff]' : ''} flex justify-start items-center   font-bold  rounded-md transition-colors mb-2 `}
          >
            <House className="lg:size-10 size-6 mr-2 flex items-center hover-rotate-slow" />
            <p className="overflow-visible  md:text-sm truncate lg:text-2xl hover:underline">
              Home
            </p>
          </Link>
          <Link
            href="/explore"
            title="Feed Page"
            className={`${pathname === '/explore' ? 'text-[#00ffff]' : ''} flex justify-start items-center   font-bold  rounded-md transition-colors mb-2`}
          >
            <Telescope className="lg:size-10 size-6 mr-2 flex items-center hover-rotate-slow" />
            <p className="overflow-visible  sm:text-base truncate lg:text-2xl md:text-sm hover:underline ">
              Explore
            </p>
          </Link>
          <Link
            href="/search"
            className={`${pathname === '/search' ? 'text-[#00ffff]' : ''} flex justify-start items-center   font-bold  rounded-md transition-colors mb-2`}
          >
            <UserRoundSearch className="lg:size-10 size-6 mr-2 flex items-center hover-rotate-slow" />
            <p className="overflow-visible  sm:text-base truncate lg:text-2xl hover:underline  md:text-xl">
              Search
            </p>
          </Link>
          <Link
            href={`/profile/${session?.user.id}`}
            className={`${pathname.startsWith('/profile/') ? 'text-[#00ffff]' : ''}
 flex justify-start items-center   font-bold  rounded-md transition-colors mb-2`}
          >
            <UserRound className="lg:size-10 size-6  mr-2 flex items-center hover-rotate-slow " />
            <p className="overflow-visible   sm:text-base truncate lg:text-2xl md:text-sm hover:underline ">
              Profile
            </p>
          </Link>
          <button
            onClick={() => scrollCallback()}
            type="button"
            className={`${pathname === '/create' ? 'text-[#00ffff]' : ''} flex justify-start items-center   font-bold  rounded-md transition-colors mb-2`}
          >
            <SendHorizontal className="lg:size-10 size-6 mr-2 flex items-center hover-rotate-slow" />
            <p className="overflow-visible  sm:text-base truncate lg:text-2xl md:text-sm hover:underline ">
              New Post
            </p>
          </button>
        </div>

        <div
          className=" w-full border-2 border-[#633a91e7] font-courier "
          ref={menuRef}
        >
          {/* <Link href="/profile/23" className="w-full"> */}
          {open && <AccountDropdown />}
          <div className=" relative  text-white">
            <div
              aria-haspopup="true"
              aria-expanded="false"
              className=" py-3  flex w-full items-center bg-[rgb(174,60,255)] hover:bg-[rgb(144,70,197)] "
            >
              {session?.user?.image ? (
                <Image
                  src={session?.user?.image}
                  alt="profile icon"
                  width={36}
                  height={36}
                  className="rounded-full ml-2 "
                />
              ) : (
                <User />
              )}
              <Link href={`/profile/${session?.user.id}`}>
                <p className="ml-2 hover:underline lg:text-xl md:text-lg sm:text-base">
                  {session?.user.name}
                </p>
              </Link>

              <button
                aria-label="More options"
                type="button"
                className="p-2 ml-auto"
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  setOpen(!open);
                }}
              >
                <EllipsisVertical className="hover:text-slate-500 " />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* // MOBILE */}
      <div className="fixed bottom-0 left-0  bg-[url(/images/BG_Grid2.gif)]  border-t border-[] p-1 z-50 w-full py-2 md:hidden">
        <div className="flex justify-between  gap-3 w-full h-full relative">
          <div className="text-white w-1/5 h-full flex flex-col items-center justify-center">
            <Link
              href="/feed"
              title="Feed Page"
              className={`${pathname === '/feed' ? 'text-[#942efb]' : ''} font-bold rounded-md transition-colors py-2 flex flex-col items-center`}
            >
              <House className="size-6 mb-1 " />
              <p className="md:text-sm lg:text-2xl hover:underline">Home</p>
            </Link>
          </div>
          <div className="text-white w-1/5 h-full flex flex-col items-center justify-center">
            <Link
              href="/explore"
              title="Explore Page"
              className={`${pathname === '/explore' ? 'text-[#942efb]' : ''} font-bold rounded-md transition-colors py-2 flex flex-col items-center`}
            >
              <Telescope className="size-6 mb-1 " />
              <p className="md:text-sm lg:text-2xl hover:underline">Explore</p>
            </Link>
          </div>
          <div className="text-white w-1/5 h-full flex flex-col items-center justify-start  flex-shrink-0">
            <Link
              href="/feed"
              title="Create post"
              className={` font-bold rounded-md transition-colors py-2 flex flex-col items-center flex-shrink-0`}
            >
              <Plus className="size-16 min-w-12    absolute -top-6 bg-purple-700 text-white rounded-full p-3  border-[#e5e7eb]   " />
            </Link>
          </div>
          <div className="text-white w-1/5 h-full flex flex-col items-center justify-center">
            <Link
              href="/search"
              title="Search Page"
              className={`${pathname === '/search' ? 'text-[#942efb]' : ''} font-bold rounded-md transition-colors py-2 flex flex-col items-center`}
            >
              <UserRoundSearch className="size-6 mb-1 " />
              <p className="md:text-sm lg:text-2xl hover:underline">Search</p>
            </Link>
          </div>
          <div className="text-white w-1/5 h-full flex flex-col items-center justify-center">
            <Link
              href={`/profile/${session?.user.id}`}
              title="Profile Page"
              className={`${pathname.startsWith('/profile/') ? 'text-[#942efb]' : ''} font-bold rounded-md transition-colors py-2 flex flex-col items-center`}
            >
              <UserRound className="size-6 mb-1 " />
              <p className="md:text-sm lg:text-2xl hover:underline">Profile</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
