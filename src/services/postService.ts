import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPaginatedPosts = async (page: number, pageSize: number = 5) => {
  return prisma.post.findMany({
    take: 5,
    orderBy: { date: 'desc' },
    skip: page * pageSize,
  });
};
export const createPost = ({
  id,
  date,
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
  return prisma.post.create({
    data: {
      id,
      date,
      content,
      image_url,
      authorId,
    },
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
export const deletePost = ({ id }: { id: string }) => {
  return prisma.post.delete({
    where: {
      id,
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
export const unlikePost = async(post_id: string, user_id: string)