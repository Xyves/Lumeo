import { NextResponse } from 'next/server';

import { getUsers } from '@/services/userService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get('input');
  const userId = searchParams.get('userId');
  const followed = searchParams.get('followed');
  const cleanedInput = input === 'null' || input === '' ? null : input;
  try {
    const newUsers = await getUsers(cleanedInput, userId,followed);
    // console.log(newUsers);
    return NextResponse.json(newUsers, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
