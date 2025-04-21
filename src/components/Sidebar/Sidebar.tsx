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

  if (status === 'loading') return null;

  const scrollCallback = () => {
    const { current } = targetRef;
    if (pathname !== '/feed') {
      router.push('/feed');
    } else {
      current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="px-2  bg-[#171006] flex flex-col h-[100vh]   relative ">
      <section className=" w-56 flex  ">
        <div className="flex flex-col p-2 gap-6  mx-auto">
          <Link
            href="/feed"
            title="Feed Page"
            className={`${pathname === '/feed' ? 'text-purple-900' : ''} flex justify-start items-center ml-6 text-3xl rounded-md transition-colors`}
          >
            <House className="size-8" />
            <p className="overflow-visible text-xs sm:text-base truncate">
              Home
            </p>
          </Link>
          <Link
            href="/explore"
            title="Feed Page"
            className={`${pathname === '/explore' ? 'text-purple-900' : ''} flex justify-start items-center ml-6 text-3xl rounded-md transition-colors`}
          >
            <Telescope className="size-8" />
            <p className="overflow-visible text-xs sm:text-base truncate">
              Explore
            </p>
          </Link>
          <Link
            href="/search"
            className={`${pathname === '/search' ? 'text-purple-900' : ''} flex justify-start items-center ml-6 text-3xl rounded-md transition-colors`}
          >
            <UserRoundSearch className="size-8" />
            <p className="overflow-visible text-xs sm:text-base truncate">
              Search
            </p>
          </Link>
          <Link
            href={`/profile/${session.user.id}`}
            className={`${pathname === `/profile/${session.user.id}` ? 'text-purple-900' : ''} flex justify-start items-center ml-6 text-3xl rounded-md transition-colors`}
          >
            <UserRound className="size-8" />
            <p className="overflow-visible text-xs sm:text-base truncate">
              Profile
            </p>
          </Link>
          <button
            onClick={() => scrollCallback()}
            type="button"
            className={`${pathname === '/create' ? 'text-purple-900' : ''} flex justify-start items-center ml-6 text-3xl rounded-md transition-colors`}
          >
            <SendHorizontal className="size-8" />
            <p className="overflow-visible text-xs sm:text-base truncate">
              Create Post
            </p>
          </button>
        </div>
      </section>
      <div className="user-info flex w-full  mt-auto" ref={menuRef}>
        {/* <Link href="/profile/23" className="w-full"> */}
        {open && <AccountDropdown />}
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded="false"
          className="w-full py-3 flex items-center   mb-16  pb-6"
        >
          {/* Name text */}
          {session?.user?.image ? (
            <Image
              src={session?.user?.image ? session?.user?.image : <User />}
              alt="profile icon"
              width={36}
              height={36}
              className="rounded-full ml-2"
            />
          ) : (
            <User />
          )}
          {status === 'authenticated' ? (
            <p className="ml-2">{session.user.name}</p>
          ) : (
            <p className="ml-2">Guest</p>
          )}

          {/* Spacer pushes right-side content to the end */}
          <div className="flex-grow" />

          {/* Ellipsis icon */}
          <div
            className="p-2"
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              setOpen(!open);
            }}
          >
            <EllipsisVertical />
          </div>

          {/* Profile Image on the FAR RIGHT */}
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
