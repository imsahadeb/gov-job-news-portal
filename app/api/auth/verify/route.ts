import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ error: 'Missing token' }, { status: 400 });
        }

        // Find user with token
        const result = await query('SELECT id, email FROM users WHERE verification_token = $1', [token]);
        const user = result.rows[0];

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        // Verify user and clear token
        await query('UPDATE users SET email_verified = TRUE, verification_token = NULL WHERE id = $1', [user.id]);

        // Generate JWT Token
        const authToken = signToken({ userId: user.id, email: user.email });

        // Create response with cookie
        const response = NextResponse.json({ success: true, message: 'Email verified successfully' });

        response.cookies.set('auth_token', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;

    } catch (error: any) {
        console.error('Verification error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
