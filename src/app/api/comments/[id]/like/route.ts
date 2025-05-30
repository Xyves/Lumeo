import { NextResponse } from 'next/server';

import { handleCommentLikePrisma } from '@/services/postService';

export async function POST(
  req: Request,
  context: { params?: { id?: string } }
) {
  const id = context.params?.id;
  const { userId } = await req.json();
  if (!id) {
    return new Response('Missing comment ID', { status: 400 });
  }
  try {
    const newLike = await handleCommentLikePrisma({
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
