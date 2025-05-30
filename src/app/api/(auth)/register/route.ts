import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import { signUser } from '@/services/userService';
import { RegisterSchema } from '@/schema';
import type { RegisterType } from '@/types';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const result = RegisterSchema.safeParse(body);
  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error.flatten() }), {
      status: 400,
    });
  }
  const { name, email, password }: RegisterType = result.data;
  if (!name || !email || !password) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing name, email, or password' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  const userExist = await prisma?.user.findUnique({
    where: {
      name,
    },
  });
  if (userExist) {
    return new NextResponse('User already exists', { status: 400 });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const newUser = await signUser(name, hashedPassword, email);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register User' },
      { status: 500 }
    );
  }
}
