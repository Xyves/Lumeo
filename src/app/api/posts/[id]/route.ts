import { NextResponse } from 'next/server';

import { deletePost, editPost, getPost } from '@/services/postService';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get('userId');

  const { id } = await params;
  if (!id) {
    return new Response('Missing comment ID', { status: 400 });
  }
  try {
    if (!userId) {
      throw new Error('User ID is null');
    }
    const Post = await getPost({ id, userId });
    return NextResponse.json(Post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

  if (!id) {
    return new Response('Missing comment ID', { status: 400 });
  }
  const { content, image_url, authorId } = await req.json();
  try {
    const editedPost = await editPost({ id, content, image_url, authorId });
    return NextResponse.json(editedPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to edit post' }, { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

  if (!id) {
    return new Response('Missing comment ID', { status: 400 });
  }
  const { authorId, userId } = await req.json();
  try {
    const deletedPost = await deletePost(id, authorId, userId);
    return NextResponse.json(deletedPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
