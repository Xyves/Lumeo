import { NextResponse } from 'next/server';

import { followUser } from '@/services/userService';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { followerId, isFollowed } = await req.json();
  const { id } = await params;

  if (!id) {
    return new Response('Missing comment ID', { status: 400 });
  }

  try {
    const newFollow = await followUser({
      followerId,
      isFollowed,
      followedId: id,
    });
    // console.log('new follow:', newFollow);
    return NextResponse.json(newFollow, { status: 201 });
  } catch (error) {
    console.error('Prisma error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
