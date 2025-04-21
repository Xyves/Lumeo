import { NextResponse } from 'next/server';

export default async function fetchPosts({ start, userId }) {
  try {
    const res = await fetch(`/api/posts/?start=${start}&userId=${userId}`, {
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
