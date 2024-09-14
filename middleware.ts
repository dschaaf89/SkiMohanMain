import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle preflight requests (OPTIONS)
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Origin', '*'); // Replace '*' with your allowed origin if needed
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    return response; // Return CORS preflight response
  }

  // Create a NextResponse object for other requests
  const response = NextResponse.next();

  // Apply CORS headers to all other requests
  response.headers.set('Access-Control-Allow-Origin', '*'); // Replace '*' with your domain if needed
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle specific API route rewrites
  if (pathname.startsWith('/api/weatherunlocked')) {
    const apiUrl = 'http://api.weatherunlocked.com' + pathname.replace('/api/weatherunlocked', '/api/current/47.3928,-121.4009');
    return NextResponse.rewrite(apiUrl + `?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`);
  }

  if (pathname === "/api/3523ea0b-4dc2-4efb-be8d-10e1740d2f63/billboards") {
    return response; // Return the response with CORS headers
  }

  // Return the response for all other cases
  return response;
}
