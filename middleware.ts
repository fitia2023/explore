import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  //routes protégées - AJOUT de /account
  const protectedRoutes = ['/account', '/utilisateurs'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  //routes d'authentification
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }
  }

  if (isAuthRoute && token) {
    const payload = verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL('/account', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/account/:path*',
    '/utilisateurs/:path*',
    '/login',
    '/register'
  ]
};