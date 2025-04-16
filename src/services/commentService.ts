/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getComments = (post_id: string, limit: number, cursor: string) => {
  return prisma.comment.findMany({
    where: {
      post_id,
    },
    take: Number(limit),
  });
};
const createPostComment = (text: string, user_id: string, post_id: string) => {
  return prisma.comment.create({
    data: {
      text,
      user_id,
      post_id,
    },
  });
};
const deletePost = (commentId: string, userId: string) => {
  return prisma.comment.deleteMany({
    where: {
      id: commentId,
      user_id: userId,
    },
  });
};
export { findPostComments, createPostComment, deletePost };
