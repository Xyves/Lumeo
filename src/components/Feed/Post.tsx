import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';
import Zoom from 'react-medium-image-zoom';
import '@/styles/zoom.css';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Image from 'next/image';
import Link from 'next/link';

import CommentsButton from './commentButton';
import LikeButton from './LikeButton';

TimeAgo.addDefaultLocale(en);
export default function Post({
  id,
  authorId,
  authorName,
  profile_image,
  content,
  post_image,
  date,
  innerRef,
  likeCount,
  commentCount,
}) {
  return (
    <div
      className="flex-col flex [&>section]:px-4 mb-6 last:mb-24 border-[rgb(217, 216, 213)] border-2"
      data-user-id={id}
      ref={innerRef}
    >
      <section className="size-16 bg-green-500 w-full flex-row flex items-center ">
        <div className="w-12 h-12  relative flex-col flex">
          <Image
            src={profile_image}
            fill
            className="rounded-full aspect-square object-cover absolute"
          />
        </div>
        <Link href={`/profile/${authorId}`}>
          <p className="ml-2 lg:text-lg">{authorName}</p>
        </Link>
        <p className="lg:text-sm text-gray-300">
          - {date && <ReactTimeAgo date={new Date(date)} locale="en-US" />}{' '}
        </p>
        <div className="menu-bar ml-auto">
          {/* If user === the id of the user comment then add this line options edit delete */}
          X
        </div>
      </section>
      <section className="  bg-blue-600 w-full flex-col flex  ">
        <p className="pt-2 mb-3 ml-6">{content}</p>
        {post_image ? (
          <Zoom>
            <div className="h-80 w-full flex items-center overflow-hidden mb-3  justify-center">
              <img src={post_image} alt="" className="  object-contain" />
            </div>
          </Zoom>
        ) : (
          ''
        )}
      </section>
      <section className="h-1/4 bg-red-500 py-3 w-full flex-row flex items-center">
        <LikeButton likeCount={likeCount} />
        <CommentsButton commentsCount={commentCount} />
      </section>
    </div>
  );
}
