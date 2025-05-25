'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import { useCommentsLoader } from '@/hooks/useCommentsLoader';

export default function CreateComments({ postId, setComments }) {
  const [input, setInput] = useState('');
  const { data: session } = useSession();
  const { handleNewComment } = useCommentsLoader();
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ userId: session.user.id, input }),
    });
    if (input.length < 3) return;
    if (response.ok) {
      const newComment = await response.json();
      console.log('new comment is:', newComment);
      newComment.user = {
        name: session.user.name,
        image: session.user.image,
      };
      handleNewComment(setComments, newComment);
      setInput('');
    } else {
      console.error('Failed to create post');
    }

    // if (formRef) {
    //   formRef.current.reset();
    // }
  };
  return (
    <div className="my-6 mx-10 ">
      <div
        className=" flex
      "
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write a comment"
          className=" py-5 flex-grow text-black px-5 w-full rounded-l-md"
        />
        <button
          type="button"
          className="bg-purple-900 rounded-r-xl px-1 py-5"
          onClick={submitComment}
        >
          Comment
        </button>
      </div>
    </div>
  );
}
