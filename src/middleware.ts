import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const session = req.cookies.get('next-auth.session-token')?.value;
  const isLoginPage = req.nextUrl.pathname === '/';

  if (!session) {
    if (isLoginPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};