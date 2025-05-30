import { NextResponse } from 'next/server';

import type { followType, UpdateUserResponse } from '@/types';

export async function registerUser({ data }: { data: any }) {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 400 });
  }
}
export default async function fetchUsers({
  userId,
  input,
  onlyFollowed,
}: {
  userId?: string;
  input?: string;
  onlyFollowed: boolean;
}) {
  try {
    const res = await fetch(
      `/api/users/?input=${input ?? ''}&userId=${userId}&followed=${onlyFollowed}`,
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
    return data;
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 400 });
  }
}
export async function updateUserHook({
  form,
}: {
  form: FormData;
}): Promise<UpdateUserResponse> {
  try {
    const id = form.get('id');
    const res = await fetch(`/api/profile/${id}`, {
      method: 'PATCH',
      body: form,
    });
    if (!res.ok) {
      return {
        statusCode: res.status,
        data: { message: 'Something went wrong' },
      };
    }
    const data = await res.json();
    return { statusCode: res.status, data };
  } catch (error) {
    return {
      statusCode: 500,
      data: { message: 'Unexpected error occurred' },
    };
  }
}
