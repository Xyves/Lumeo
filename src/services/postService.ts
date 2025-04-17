import { PrismaClient } from '@prisma/client';

import uploadFile from './cloudinaryService';

const prisma = new PrismaClient();

export const getPosts = async (start: number) => {
  return prisma.post.findMany({
    take: 5,
    skip: start,
    orderBy: { date: 'desc' },
  });
};
export const createPost = async ({
  content,
  file,
  authorId,
}: {
  content: string;
  file: File | null;
  authorId: string;
}) => {
  let cloudinaryResponse = null;
  console.log(file);
  if (file && file.size > 0) {
    cloudinaryResponse = await uploadFile(file);
  }
  return prisma.post.create({
    data: {
      content,
      image_url: cloudinaryResponse ? cloudinaryResponse.secure_url : null,
      authorId,
    },
  });
};

export const likePost = async (post_id: string, user_id: string) => {
  try {
    const [likes, updatePost] = await prisma.$transaction([
      prisma.like.create({
        data: {
          post_id,
          user_id,
        },
      }),
      prisma.post.update({
        where: { id: post_id },
        data: { likeCount: { increment: 1 } },
      }),
    ]);
    return { likes, updatePost };
  } catch (error) {
    throw new Error('Failed to like the post.');
  }
};
// Single post operations:
export const getPost = async (id: string) => {
  return prisma.post.findFirst({
    where: { id },
  });
};
export const editPost = ({
  id,
  content,
  image_url,
  authorId,
}: {
  id: string;
  date: Date;
  content: string;
  image_url: string;
  authorId: string;
}) => {
  return prisma.post.updateMany({
    where: {
      AND: [{ id }, { authorId }],
    },
    data: {
      content,
      image_url,
    },
  });
};
export const deletePost = ({
  id,
  authorId,
}: {
  id: string;
  authorId: string;
}) => {
  return prisma.post.deleteMany({
    where: {
      AND: [{ id }, { authorId }],
    },
  });
};
// export const unlikePost = async(post_id: string, user_id: string)
