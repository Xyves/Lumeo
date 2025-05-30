'use client';

import { useCallback, useRef, useState } from 'react';

import Post from './Post';

export default function PostsList({
  memoizedPosts,
  handleUpdateStart,
  setStart,
  onDelete,
}: {
  memoizedPosts: any;
  setStart: any;
  handleUpdateStart: any;
  onDelete: any;
}) {
  const observer = useRef<IntersectionObserver | null>(null);
  const [loading, setLoading] = useState(false);
  const lastPostElementRef = useCallback(
    (node: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          // console.log(' Last post is visible!');
          handleUpdateStart(setStart);
        }
      });

      if (node) {
        observer.current.observe(node);
        // console.log(' Observing node:', node);
      }
    },
    [loading]
  );

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
            deletePost={onDelete}
          />
        );
      })}
    </>
  );
}
