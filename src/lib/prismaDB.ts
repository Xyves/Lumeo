import { PrismaClient } from '@prisma/client';

import secretKey from '@/env';

declare global {
  // This makes sure TypeScript knows about the global `prisma`
  let prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();

if (secretKey.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export const prismaDB = prisma;
