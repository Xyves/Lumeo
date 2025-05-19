import { NextResponse } from 'next/server';

import { getUserPosts } from '@/services/postService';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(req.url);
  const { id } = await params;
  const authorId = id;
  const start = parseInt(searchParams.get('start') || '0', 10);
  const userId = searchParams.get('userId');
  try {
    const newPosts = await getUserPosts(start, userId, authorId);
    return NextResponse.json(newPosts, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
