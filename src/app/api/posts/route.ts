/* eslint-disable camelcase */
import { NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';

import {
  createPost,
  deletePost,
  getPosts,
  getPostsWithUsers,
} from '@/services/postService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const start = parseInt(searchParams.get('start') || '0', 10);
  const feedType = searchParams.get('feedType');
  try {
    const newPosts = await getPostsWithUsers(start, userId, feedType);
    return NextResponse.json(newPosts, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const formData = await req.formData();

  const content = formData.get('content');
  const file = formData.get('file');
  const authorId = formData.get('id');

  try {
    const newPost = await createPost({
      content,
      ...(file && { file }),
      authorId,
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
