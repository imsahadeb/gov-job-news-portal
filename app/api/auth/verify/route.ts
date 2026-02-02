import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ error: 'Missing token' }, { status: 400 });
        }

        // Find user with token
        const result = await query('SELECT id FROM users WHERE verification_token = $1', [token]);
        const user = result.rows[0];

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        // Verify user and clear token
        await query('UPDATE users SET email_verified = TRUE, verification_token = NULL WHERE id = $1', [user.id]);

        return NextResponse.json({ success: true, message: 'Email verified successfully' });

    } catch (error: any) {
        console.error('Verification error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
