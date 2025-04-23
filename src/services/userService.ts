import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const login = async ({ name, email }) => {
  const isEmailLogin = /\S+@\S+\.\S+/.test(name);
  const user = await prisma.user.findUnique({
    where: isEmailLogin ? { email: name } : { name },
  });
};
export const signUser = async (name, hashedPassword, email) => {
  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });
};
const unFollowUser = async () => {};
export const getUsers = async (input, authorId) => {
  console.log('in prisma');
  return prisma.user.findMany({
    where: input
      ? {
          id: { not: authorId },
          name: { contains: input, mode: 'insensitive' },
        }
      : {
          id: { not: authorId },
        },
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
    // ...(input && {
    //   name: {
    //     contains: input,
    //     mode: 'insensitive',
    //   },
    // }),
  });
};
export const getProfile = async id => {
  return prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      image: true,
      followingCounter: true,
      followedCounter: true,
    },
  });
};
export const followUser = async ({ followerId, followedId, isFollowed }) => {
  console.log(followerId, followedId, isFollowed);
  return prisma.$transaction(
    !isFollowed
      ? [
          prisma.follower.createMany({
            data: {
              followerUserId: followerId,
              followedUserId: followedId,
            },
          }),
          prisma.user.update({
            where: {
              id: followerId,
            },
            data: {
              followingCounter: {
                increment: 1,
              },
            },
          }),
          prisma.user.update({
            where: {
              id: followedId,
            },
            data: {
              followedCounter: {
                increment: 1,
              },
            },
          }),
        ]
      : [
          prisma.follower.deleteMany({
            where: {
              followerUserId: followerId,
              followedUserId: followedId,
            },
          }),
          prisma.user.update({
            where: {
              id: followerId,
            },
            data: {
              followingCounter: {
                decrement: 1,
              },
            },
          }),
          prisma.user.update({
            where: {
              id: followedId,
            },
            data: {
              followedCounter: {
                decrement: 1,
              },
            },
          }),
        ]
  );
};
