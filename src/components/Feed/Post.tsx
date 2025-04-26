import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';
import Zoom from 'react-medium-image-zoom';
import '@/styles/zoom.css';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  isLiked,
}) {
  const router = useRouter();
  return (
    <div
      className="flex-col flex [&>section]:px-4 mb-6 last:mb-24 border-[rgb(217, 216, 213)] border-2"
      data-user-id={id}
      ref={innerRef}
    >
      <div
        onClick={() => router.push(`/post/${id}`)}
        className="cursor-pointer"
      >
        <section className=" bg-blue-500 w-full flex-row flex items-center p-3">
          <div className="w-12 h-12  relative flex-col flex">
            <Link
              href={`/profile/${authorId}`}
              onClick={e => e.stopPropagation()}
            >
              <Image
                onClick={e => e.stopPropagation()}
                src={profile_image}
                fill
                className="rounded-full aspect-square object-cover absolute"
              />
            </Link>
          </div>
          <Link
            href={`/profile/${authorId}`}
            onClick={e => e.stopPropagation()}
          >
            <p className="ml-2 lg:text-lg hover:underline">{authorName}</p>
          </Link>
          <p className="lg:text-sm text-gray-300">
            - {date && <ReactTimeAgo date={new Date(date)} locale="en-US" />}{' '}
          </p>
          <div className="menu-bar ml-auto">
            {/* If user === the id of the user comment then add this line options edit delete */}
            X
          </div>
        </section>
        <section
          className="w-full flex-col flex"
          onClick={e => e.stopPropagation()}
        >
          <p className="py-4 ml-10 px-2">{content}</p>
          {post_image ? (
            <Zoom>
              <div className="h-80 w-full flex items-center overflow-hidden mb-3   justify-center">
                <img src={post_image} alt="" className="  object-contain" />
              </div>
            </Zoom>
          ) : (
            ''
          )}
        </section>
        <section
          className="h-1/4 bg-red-500 py-3 w-full flex-row flex items-center pl-6"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <LikeButton likeCount={likeCount} postId={id} isLiked={isLiked} />
          <CommentsButton commentsCount={commentCount} id={id} />
        </section>
      </div>
    </div>
  );
}
