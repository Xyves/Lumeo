'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Image as Img } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { useTargetRef } from '@/context/RefContext';
import { usePostLoader } from '@/hooks/usePostLoader';
import type { PostInterface } from '@/types';

export default function CreatePost({
  setPostsAction,
}: {
  setPostsAction: React.Dispatch<React.SetStateAction<PostInterface[]>>;
}) {
  console.log('Set posts:', setPostsAction);
  const { data: session } = useSession();
  const { handleNewPost } = usePostLoader();
  const [postData, setPostData] = useState<{
    content: string;
    file: File | null;
  }>({
    content: '',
    file: null,
  });
  const { targetRef } = useTargetRef();
  const formRef = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setPostData({ ...postData, file });
    }
  };
  if (!session) {
    return null;
  }
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (postData.content.length < 3) {
      console.error('Failed to create post');
      return;
    }

    const formData = new FormData();
    formData.append('content', postData.content);
    formData.append('id', session.user.id);
    if (postData.file) {
      formData.append('file', postData.file);
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const newPost = await response.json();
      newPost.author = {
        name: session?.user.name,
        image: session?.user.image,
      };
      handleNewPost(setPostsAction, newPost);
      setPostData({ ...postData, content: '' });
    } else {
      console.error('Failed to create post');
    }

    if (formRef.current) {
      formRef.current.reset();
    }
  };
  return (
    <div
      className="w-full  border-2 rounded-md p-3 mb-10 border-purple-800 bg-[rgba(0,0,0,0.9)] "
      ref={targetRef}
    >
      <form method="POST" onSubmit={submitPost} ref={formRef}>
        <div className="w-full h-1/2 flex p-3 items-center">
          <div className="image w-12 h-12 relative ">
            <Image
              className="rounded-3xl"
              fill
              alt="user image"
              src={session?.user?.image || '/images/default_user.webp'}
            />
          </div>
          <textarea
            maxLength={144}
            minLength={3}
            value={postData.content}
            onChange={e => {
              setPostData({ ...postData, content: e.target.value });
            }}
            rows={3}
            placeholder="What is happening?"
            // placeholder:text-[#edd852]    text-[#edd852] border-[#edd852]
            className="w-5/6  p-2 mx-auto resize-none 
              rounded md
              placeholder:text-[#EFEFEF] text-[#EFEFEF] border-[#EFEFEF]
   border-[.09rem]  bg-[rgba(0,0,0,0.8)]"
          />
        </div>
        <div className=" flex items-end justify-end  pt-1 py-2">
          <div className="flex items-end ml-auto space-x-2 mr-3 h-full ">
            {fileName && (
              <p className="text-sm text-[#00e6fe] break-words max-w-[350px] whitespace-normal">
                Selected: {fileName}
              </p>
            )}
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 px-4 py-2   bg-[#5521cf] text-white rounded-xl cursor-pointer hover:bg-[#3d1f84] transition"
            >
              <Img className="w-5 h-5 " />
            </label>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={e => {
                handleFileChange(e);
              }}
            />
          </div>
          {/* img(add photo) */}
          <button className="bg-[#5521cf] px-8 py-2 rounded-3xl  mr-10 hover:bg-[#3d1f84] text-slate-50">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
