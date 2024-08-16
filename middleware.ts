import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Run middleware only on API routes
  if (url.pathname.startsWith('/api/')) {
    console.log(`Middleware running on: ${url.href}`);
    return NextResponse.next();
  }

  // For all other routes, return NextResponse.next() without doing anything
  return NextResponse.next();
}
