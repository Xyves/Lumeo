/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { PrismaClient } from '@prisma/client';

import secretKey from '@/env';

declare global {
  // Augment the Node.js global object with `prisma`
  var prisma: PrismaClient | undefined;
}

// Prevent multiple instances during development (hot reload)
const prisma = global.prisma ?? new PrismaClient();

if (secretKey.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export const prismaDB = prisma;
