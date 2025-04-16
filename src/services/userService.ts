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
const followUser = async () => {};
const unFollowUser = async () => {};
