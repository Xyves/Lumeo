import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET(request: Request) {
  const posts = await prisma.post.findMany({ LIMIT: 15 });
}
