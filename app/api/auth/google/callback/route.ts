import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { sendWelcomeEmail } from '@/lib/email';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

    const cookieStore = await cookies();
    const storedState = cookieStore.get('oauth_state')?.value;

    if (!code || !state || !storedState || state !== storedState || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !APP_URL) {
        return NextResponse.redirect(`${APP_URL}/login?error=auth_failed`);
    }

    try {
        // Exchange code for tokens
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: `${APP_URL}/api/auth/google/callback`,
            }),
        });

        const tokenData = await tokenRes.json();

        if (!tokenRes.ok) {
            console.error('Google Token Error:', tokenData);
            return NextResponse.redirect(`${APP_URL}/login?error=token_error`);
        }

        // Get User Info
        const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        const googleUser = await userRes.json();

        if (!userRes.ok) {
            console.error('Google User Error:', googleUser);
            return NextResponse.redirect(`${APP_URL}/login?error=user_error`);
        }

        // Check if user exists
        let userResult = await query('SELECT * FROM users WHERE email = $1', [googleUser.email]);
        let user = userResult.rows[0];

        if (!user) {
            // Create new user
            const insertResult = await query(
                'INSERT INTO users (name, email, google_id, image, email_verified) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [googleUser.name, googleUser.email, googleUser.id, googleUser.picture, true]
            );
            user = insertResult.rows[0];

            // Send Welcome Email
            await sendWelcomeEmail(user.email, user.name);
        } else {
            // Update existing user with google_id if missing
            if (!user.google_id) {
                await query('UPDATE users SET google_id = $1, image = $2, email_verified = $3 WHERE email = $4', [
                    googleUser.id,
                    googleUser.picture,
                    true,
                    googleUser.email
                ]);
            }
        }

        // Generate JWT
        const token = signToken({ userId: user.id, email: user.email });

        // Set Cookie
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            sameSite: 'lax'
        });

        // Clean up state cookie
        cookieStore.delete('oauth_state');

        return NextResponse.redirect(`${APP_URL}/`);

    } catch (error) {
        console.error('Google Callback Error:', error);
        return NextResponse.redirect(`${APP_URL}/login?error=internal_error`);
    }
}
