import { NextResponse } from 'next/server';

export default async function fetchPosts({ start, userId, feedType }) {
  try {
    const res = await fetch(
      `/api/posts/?start=${start}&userId=${userId}&feedType=${feedType}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok)
      return NextResponse.json('Something went wrong', { status: 400 });
    const data = await res.json();
    return data;
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 400 });
  }
}
export async function fetchPost({ postId, userId }) {
  try {
    const res = await fetch(`/api/posts/${postId}?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok)
      return NextResponse.json('Something went wrong', { status: 400 });
    const data = await res.json();
    return data;
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 400 });
  }
}
export async function useToggleLike({ postId, userId }) {
  try {
    const res = await fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok)
      return NextResponse.json('Something went wrong', { status: 400 });
    const data = await res.json();
    return data;
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 400 });
  }
}
