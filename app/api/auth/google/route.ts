import { NextResponse } from 'next/server';

export async function GET() {
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

    if (!GOOGLE_CLIENT_ID || !APP_URL) {
        return NextResponse.json({ error: 'Google Auth not configured' }, { status: 500 });
    }

    const redirectUri = `${APP_URL}/api/auth/google/callback`;
    const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

    // Generate state for CSRF protection
    const state = crypto.randomUUID();

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&state=${state}`;

    const response = NextResponse.redirect(googleAuthUrl);

    // Set state cookie
    response.cookies.set('oauth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 10, // 10 minutes
        path: '/',
        sameSite: 'lax'
    });

    return response;
}
