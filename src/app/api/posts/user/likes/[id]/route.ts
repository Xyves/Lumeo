import { NextResponse } from 'next/server';

import { getUserLikedPosts } from '@/services/postService';

export async function GET(req: Request, context: { params: { id: string } }) {
  const { searchParams } = new URL(req.url);

  const { id } = context.params;
  const userId = searchParams.get('userId');
  const profileId = id;
  // console.log('profileID:', profileId, 'userId:', userId);
  if (!userId)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  try {
    const newPosts = await getUserLikedPosts(profileId, userId);
    return NextResponse.json(newPosts, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
