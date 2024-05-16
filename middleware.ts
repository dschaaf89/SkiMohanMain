import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/weatherunlocked')) {
    const apiUrl = 'http://api.weatherunlocked.com' + pathname.replace('/api/weatherunlocked', '/api/current/47.3928,-121.4009');
    return NextResponse.rewrite(apiUrl + `?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`);
  }
  if (pathname === "/api/3523ea0b-4dc2-4efb-be8d-10e1740d2f63/billboards") {
    // Perform any specific action here or simply let the request proceed
    return NextResponse.next();
  }

  return NextResponse.next();
}