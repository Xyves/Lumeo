import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import LikeButton from '../Feed/LikeButton';

import CreateComments from './CreateComments';
import PostComment from './PostComment';

export default function CommentsList({ memoizedComments }) {
  console.log(memoizedComments);
  return (
    <div className="flex w-full flex-col">
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
