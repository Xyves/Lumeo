import { NextResponse } from 'next/server';

import { handleLikePrisma } from '@/services/postService';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return new Response('Missing comment ID', { status: 400 });
  }
  const { userId } = await req.json();
  // console.log(userId, id);
  try {
    const newLike = await handleLikePrisma({
      id,
      userId,
    });
    return NextResponse.json(newLike, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
