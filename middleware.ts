import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Check for auth_token cookie
    const token = request.cookies.get("auth_token")?.value;

    // Protected paths
    const protectedPaths = ["/dashboard"];
    const path = request.nextUrl.pathname;

    const isProtected = protectedPaths.some((prefix) => path.startsWith(prefix));

    if (isProtected && !token) {
        // Redirect to login if accessing protected route without token
        const response = NextResponse.redirect(new URL("/login", request.url));
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
