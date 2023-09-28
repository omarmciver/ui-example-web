import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.url;

    // Check if the URL contains the specific substring
    if (url.includes('_next/static/chunks/app/things/')) {
        console.log('Incoming Request URL:', url);
    }

    // Return undefined to continue to the next middleware or route handler
    return undefined;
}
