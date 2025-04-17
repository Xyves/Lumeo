import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const accessToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/feed', '/search', '/profile/:path*'],
};
