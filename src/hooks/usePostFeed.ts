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
    if (!res.ok) {
      console.error('Fetch failed with status:', res.status);
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
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
export async function useToggleLike({ postId, userId, commentId }) {
  const endpoint = commentId
    ? `/api/comments/${commentId}/like`
    : `/api/posts/${postId}/like`;
  try {
    const res = await fetch(endpoint, {
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
export async function fetchUserPosts({ start, userId, authorId }) {
  try {
    const res = await fetch(
      `/api/posts/user/${authorId}?start=${start}&userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok) {
      console.error('Fetch failed with status:', res.status);
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 400 });
  }
}
export async function fetchLikedPosts({ userId }) {
  try {
    const res = await fetch(`/api/posts/user/likes/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      console.error('Fetch failed with status:', res.status);
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 400 });
  }
}
