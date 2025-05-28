import { NextResponse } from 'next/server';

import type { getSinglePost } from '@/types';

export default async function fetchComments({ postId, userId }: getSinglePost) {
  try {
    const res = await fetch(`/api/posts/${postId}/comments?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok)
      return NextResponse.json('Something went wrong', { status: 400 });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 400 });
  }
}
