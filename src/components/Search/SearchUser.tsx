import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function SearchUser({
  name,
  image,
  id,
}: {
  name: string | null;
  id: string;
  image: string | null;
}) {
  return (
    <Link href={`/profile/${id}`}>
      <div className="w-full  flex  px-5 items-center h-16 ">
        <button
          aria-label={id}
          className="flex  hover:bg-[#440c7c] w-full h-full items-center"
          type="button"
        >
          {image ? (
            <Image
              src={image}
              width={48}
              height={48}
              alt="user profile image"
              className="rounded-full"
            />
          ) : (
            <UserCircle width={48} height={48} />
          )}
          <div className="ml-2">{name}</div>
        </button>
      </div>
    </Link>
  );
}
