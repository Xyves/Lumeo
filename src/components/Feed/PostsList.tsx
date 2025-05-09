'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NextResponse } from 'next/server';

import Post from './Post';

export default function PostsList({
  memoizedPosts,
  handleUpdateStart,
  setStart,
}: {
  memoizedPosts: any;
  setStart: any;
  handleUpdateStart: any;
}) {
  const observer = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const lastPostElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          console.log('👀 Last post is visible!');
          handleUpdateStart(setStart);
        }
      });

      if (node) {
        observer.current.observe(node);
        console.log('📌 Observing node:', node);
      }
    },
    [loading]
  );
  console.log(memoizedPosts);

  if (!Array.isArray(memoizedPosts)) {
    return null;
  }
  return (
    <>
      {memoizedPosts.map((post, i) => {
        if (!post) return null;

        return (
          <Post
            id={post.id}
            post_image={post.image_url}
            content={post.content}
            authorId={post.author.id}
            authorName={post.author.name}
            profile_image={post.author.image}
            date={post.date}
            key={post.id}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            isLiked={post.isLiked}
            innerRef={
              i === memoizedPosts.length - 1 ? lastPostElementRef : null
            }
          />
        );
      })}
    </>
  );
}
