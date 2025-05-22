import { PrismaClient } from '@prisma/client';

import type { editProfileType, getUsersProps } from '@/types';

import uploadFile from './cloudinaryService';

const prisma = new PrismaClient();
// const login = async ({ name, email }) => {
//   const isEmailLogin = /\S+@\S+\.\S+/.test(name);
//   const user = await prisma.user.findUnique({
//     where: isEmailLogin ? { email: name } : { name },
//   });
// };
export const signUser = async (
  name: string,
  hashedPassword: string,
  email: string
) => {
  const randomSeed = Math.random().toString(36).substring(7);
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/png?seed=${randomSeed}`;

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
      image: avatarUrl,
    },
  });
};
export const getUsers = async (
  input,
  userId,
  followed
) => {
  const followedBoolean = followed === 'true';
  console.log({ input, userId, followed });
  return prisma.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
      // id: { not: userId },
      ...(input && {
        name: {
          contains: input,
          mode: 'insensitive',
        },
      }),
      ...(followedBoolean && {
        following: {
          none: {
            followerUserId: userId,
          },
        },
      }),
    },
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
export const getProfile = async (id, authorId) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      email: true,
      image: true,
      followingCounter: true,
      followedCounter: true,
    },
  });
  if (!user || id === authorId)
    return {
      ...user,
      isFollowing: false,
    };
  console.log('Checking follow between:', { authorId, id });

  const followExists = await prisma.follower.findFirst({
    where: {
      followerUserId: authorId,
      followedUserId: id,
    },
    select: { id: true },
  });
  console.log({
    ...user,
    isFollowing: !!followExists,
  });
  return {
    ...user,
    isFollowing: !!followExists,
  };
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
export const patchUser = async ({
  id,
  updateData,
}: {
  id: string;
  updateData: editProfileType;
}) => {
  const { name, email, file } = updateData;

  let cloudinaryResponse = null;
  console.log(file);
  if (file && file.size > 0) {
    cloudinaryResponse = await uploadFile(file);
  }
  const data: any = {};

  if (name) data.name = name;
  if (email) data.email = email;
  if (cloudinaryResponse?.secure_url)
    data.image = cloudinaryResponse.secure_url;
  console.log('5', data);
  return prisma.user.update({
    where: { id },
    data,
  });
};
