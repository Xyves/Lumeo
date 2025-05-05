import { NextResponse } from 'next/server';

import { getProfile } from '@/services/userService';

export async function GET(req: Request, { params }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);

  const authorId = searchParams.get('authorId');
  console.log(id);
  try {
    const profile = await getProfile(id, authorId);
    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
