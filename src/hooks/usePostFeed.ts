import { NextResponse } from 'next/server';
import { LoadPostsArgs } from './usePostLoader';
import { PostInterface } from '@/types';

export default async function fetchPosts({ start, userId, feedType }: LoadPostsArgs) {
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
export async function deletePostById({id,authorId,userId}: PostInterface){
  try{
    const res = await fetch(`/api/posts/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json" 
      } ,
      body: JSON.stringify({ userId,authorId }),
    })
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
export async function fetchLikedPosts({ profileId, userId }) {
  try {
    const res = await fetch(
      `/api/posts/user/likes/${profileId}?userId=${userId}`,
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
