import { NextResponse } from 'next/server';

import { getProfile, patchUser } from '@/services/userService';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);

  const authorId = searchParams.get('authorId');
  try {
    const profile = await getProfile(id, authorId);
    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const formData = await req.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const file = formData.get('file');
  const updateData: any = {};
  if (name && name !== 'null') updateData.name = name;
  if (email && email !== 'null') updateData.email = email;
  if (file && file !== 'null' && typeof file !== 'string')
    updateData.file = file;
  try {
    const updatedUser = await patchUser({
      id,
      updateData,
    });
    return NextResponse.json({
      statusCode: 201,
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
