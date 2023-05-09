// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api/entries/')) {
        const id = request.nextUrl.pathname.replace('/api/entries/', '');
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        if (!checkMongoIDRegExp.test(id)) {
            const url = request.nextUrl.clone();
            url.pathname = '/api/bad-request';
            // Podemos definir la query.
            url.search = `?message=${id} no es un id valido de mongo.`
            // Sobre escribe a partir de la url.
            return NextResponse.rewrite(url);
        }

        console.log({ id });
    }

    // console.log({ request: request.nextUrl.pathname });
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // '/api/:path/',
        '/api/entries/:path/'],
}