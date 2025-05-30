import { NextResponse } from 'next/server';

import { createPostComment, getComments } from '@/services/commentsService';

export async function GET(req: Request, context: { params?: { id?: string } }) {
  const id = context.params?.id;
  if (!id) {
    return new Response('Missing comment ID', { status: 400 });
  }
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  try {
    if (!userId) {
      throw new Error('Missing userId');
    }
    const newComments = await getComments({ postId: id, userId });
    return NextResponse.json(newComments, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
export async function POST(
  request: Request,
  context: { params?: { id?: string } }
) {
  const id = context.params?.id;
  if (!id) {
    return new Response('Missing comment ID', { status: 400 });
  }

  const { input, userId } = await request.json();

  try {
    const newComment = await createPostComment({ input, userId, postId: id });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
