import { NextResponse } from 'next/server';

import { deletePost, editPost, getPost } from '@/services/postService';

export async function GET(req: Request, { params }) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get('userId');

  const { id } = await params;
  try {
    const Post = await getPost({ id, userId });
    return NextResponse.json(Post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
export async function PATCH(req: Request, { params }) {
  const { id } = await params;

  const { content, image_url, authorId } = await req.json();
  try {
    const editedPost = await editPost({ id, content, image_url, authorId });
    return NextResponse.json(editedPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to edit post' }, { status: 500 });
  }
}
export async function DELETE(req: Request, { params }) {
  const { id } = await params;
  const { authorId } = req.json();
  try {
    const deletedPost = await deletePost({ id, authorId });
    return NextResponse.json(deletedPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
