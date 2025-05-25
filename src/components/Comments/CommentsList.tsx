import React from 'react';

import type { commentType } from '@/types';

import PostComment from './PostComment';

export default function CommentsList({
  memoizedComments,
}: {
  memoizedComments: commentType;
}) {
  console.log('memoizedComments', memoizedComments);
  return (
    <div className="flex w-full flex-col ">
      {Array.isArray(memoizedComments) &&
        memoizedComments.map(comment => {
          return (
            <PostComment
              key={comment.id}
              text={comment.text}
              isLiked={comment.isLiked}
              userId={comment.user.id}
              id={comment.id}
              name={comment.user.name}
              commentLikesCount={comment.commentLikesCount}
            />
          );
        })}
    </div>
  );
}
