import { NextResponse } from 'next/server';

import { getComments } from '@/services/commentService';

export async function GET(req: Request) {
  const { postId, limit = 2, cursor } = req.json();
  try {
    const newPosts = await getComments(postId, limit, cursor);
    return NextResponse.json(newPosts, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  const { id, content, image_url, authorId } = await request.json();

  try {
    const newPost = await createPost({ id, content, image_url, authorId });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
