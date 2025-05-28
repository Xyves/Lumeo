import { NextResponse } from 'next/server';

import { getUsers } from '@/services/userService';
import type { getUsersProps } from '@/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const followedParam = searchParams.get('followed');
  const followed =
    followedParam === 'true'
      ? true
      : followedParam === 'false'
        ? false
        : undefined;
  let input = searchParams.get('input');
  input = input === 'null' || input === '' ? null : input;
  try {
    const newUsers: getUsersProps[] = await getUsers(input, userId, followed);
    // console.log(newUsers);
    return NextResponse.json(newUsers, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
