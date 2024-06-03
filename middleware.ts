import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Set CORS headers to allow all origins
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: response.headers });
  }

  if (pathname.startsWith('/api/weatherunlocked')) {
    const apiUrl = 'http://api.weatherunlocked.com' + pathname.replace('/api/weatherunlocked', '/api/current/47.3928,-121.4009');
    return NextResponse.rewrite(apiUrl + `?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`);
  }

  if (pathname === "/api/3523ea0b-4dc2-4efb-be8d-10e1740d2f63/billboards") {
    // Perform any specific action here or simply let the request proceed
    return NextResponse.next();
  }

  return response;
}
