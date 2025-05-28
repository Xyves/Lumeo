/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client';

import type { fetchPostType, toggleLikeType } from '@/types';

const prisma = new PrismaClient();

export const getComments = async ({ postId, userId }: fetchPostType) => {
  const comments = await prisma.comment.findMany({
    where: {
      post_id: postId,
    },
    orderBy: { timestamp: 'desc' },

    select: {
      id: true,
      text: true,
      timestamp: true,
      commentLikesCount: true,
      commentLikes: {
        where: {
          userId,
        },
        select: {
          id: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  const commentsWithIsLiked = comments.map(comment => ({
    ...comment,
    isLiked: comment.commentLikes.length > 0,
  }));
  console.log('commentsWithIsLiked:', commentsWithIsLiked);
  return commentsWithIsLiked;
};
const createPostComment = async ({
  input,
  userId,
  postId,
}: {
  input: string;
  userId: string;
  postId: string;
}) => {
  try {
    const [newComment] = await prisma.$transaction([
      prisma.comment.create({
        data: {
          text: input,
          user_id: userId,
          post_id: postId,
        },
      }),
      prisma.post.update({
        where: { id: postId },
        data: {
          commentCount: {
            increment: 1,
          },
        },
      }),
    ]);

    const commentWithIsLiked = {
      ...newComment,
      isLiked: false,
    };
    return commentWithIsLiked;
  } catch (error) {
    console.error('Error creating comment or updating post:', error);
    throw new Error('Failed to create comment or update post.');
  }
};
const deletePost = ({ postId, commentId, userId }: toggleLikeType) => {
  return prisma.$transaction([
    prisma.comment.deleteMany({
      where: {
        user_id: userId,
        id: userId,
      },
    }),
    prisma.post.updateMany({
      where: { id: postId },
      data: {
        commentCount: {
          decrement: 1,
        },
      },
    }),
  ]);
  // return prisma.comment.deleteMany({
  //   where: {
  //     id: commentId,
  //     user_id: userId,
  //   },
  // });
};
export { createPostComment, deletePost };
