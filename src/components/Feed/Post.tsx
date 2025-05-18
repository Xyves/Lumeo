import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';
import 'primeicons/primeicons.css';

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
import { useSession } from 'next-auth/react';
import { usePostLoader } from '@/hooks/usePostLoader';

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
  deletePost
}) {
  const { deletePostFromDb } = usePostLoader();

    const { data: session } = useSession();
  const handleDeletePost = async()=>{
  console.log("Trying to delete post",id,authorId,session?.user.id)
  await  deletePostFromDb({id,authorId,userId:session?.user.id})
  await deletePost(id)
  }
  const router = useRouter();
  return (
    <div
      className="flex-col flex [&>section]:px-4 mb-6 last:mb-24 border-[#5b34ac] border-2 rounded-lg   bg-[rgba(0,0,0,0.6)]
      "
      data-user-id={id}
      ref={innerRef}
    >
      <div className="cursor-pointer rounded-lg">
        <section className="  w-full flex-row flex items-center p-3 rounded-t-md">
          <div className="w-12 h-12  relative flex-col flex">
            <Link
              href={`/profile/${authorId}`}
              onClick={e => e.stopPropagation()}
            >
              <Image
                onClick={e => e.stopPropagation()}
                src={profile_image || '/images/default_user.webp'}
                fill
                className="rounded-full aspect-square object-cover absolute"
              />
            </Link>
          </div>
          <Link
            href={`/profile/${authorId}`}
            onClick={e => e.stopPropagation()}
          >
            <p className="ml-2 lg:text-lg hover:underline font-bold font-courier text-[#8b28cd]">
              {authorName}
            </p>
          </Link>
     <div className="relative group inline-block w-fit">
  <p className="lg:text-sm text-purple-300">
    - {date && <ReactTimeAgo date={new Date(date)} locale="en-US" />}
  </p>
  <div className="absolute bottom-full mb-1 hidden w-max rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block z-10">
    {new Date(date).toLocaleString()}
  </div>
</div>
          
             { authorId === session.user.id ? <button onClick={handleDeletePost} className='pi ml-auto pi-trash text-red-700 size-16 active:text-red-900 hover:text-red-500'></button> : null }
        </section>
        <section
          className="w-full flex-col flex tracking-[.26rem]"
          onClick={e => router.push(`/post/${id}`)}
        >
          {/* // text-[#edd852] */}
          <p className="py-6 ml-6 px-2  
          text-[#F1E3E4x]
           border-[#14a014] font-serif ">
            {content}
          </p>
          {/* bg-[#1F2937] */}
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
          onClick={e => e.stopPropagation()}
          className="h-1/4  py-3 w-full flex-row flex items-center pl-6 rounded-b-md bg-[rgb(68,12,124)]"
        >
          <LikeButton
            likeCount={likeCount}
            postId={id}
            isLiked={isLiked}
            type="post"
          />
          <CommentsButton commentsCount={commentCount} id={id} />
        </section>
      </div>
    </div>
  );
}
