import React from 'react';

import type { PostsLikesToggleProps } from '@/types';

export default function PostsLikesToggle({
  view,
  setView,
}: PostsLikesToggleProps) {
  return (
    <>
      <button
        className={` bg-yellow-400 w-1/2 text-center py-3 ${view === 'posts' ? 'border-2 active:bg-yellow-600 hover:bg-yellow-300' : ''}`}
        type="button"
        onClick={() => setView('posts')}
      >
        Posts
      </button>
      <button
        className={`bg-blue-700 w-1/2 text-center py-3 ${view === 'likes' ? 'border-2  active:bg-blue-800 hover:bg-blue-700' : ''}`}
        type="button"
        onClick={() => setView('likes')}
      >
        Likes
      </button>
    </>
  );
}
