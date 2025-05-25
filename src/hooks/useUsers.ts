import { NextResponse } from 'next/server';

import type { followType } from '@/types';

export default async function fetchUsers({ userId, input, onlyFollowed }) {
  try {
    const res = await fetch(
      `/api/users/?input=${input}&userId=${userId}&followed=${onlyFollowed}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(input, userId);
    if (!res.ok)
      return NextResponse.json('Something went wrong', { status: 400 });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 400 });
  }
}
export async function fetchUserProfile({
  id,
  authorId,
}: {
  id: string;
  authorId: string;
}) {
  try {
    const res = await fetch(`/api/profile/${id}?authorId=${authorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      return NextResponse.json('Something went wrong', { status: 400 });
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 400 });
  }
}
export async function updateFollowUser({
  followerId,
  followedId,
  isFollowed,
}: followType) {
  try {
    const res = await fetch(`/api/users/follow/${followedId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ followerId, isFollowed }),
    });
    if (!res.ok) {
      return NextResponse.json('Something went wrong', { status: 400 });
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 400 });
  }
}
export async function updateUserHook({ form }: any) {
  try {
    const id = form.get('id');
    const res = await fetch(`/api/profile/${id}`, {
      method: 'PATCH',
      body: form,
    });
    if (!res.ok) {
      return NextResponse.json('Something went wrong', {
        statusCode: 400,
      } as any);
    }
    const data = await res.json();
    console.log(data);
    return { statusCode: res.status, data };
  } catch (error) {
    return NextResponse.json('Something went wrong', {
      statusCode: 400,
    } as any);
  }
}
