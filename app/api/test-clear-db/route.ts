import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        await query('DELETE FROM users');
        return NextResponse.json({ message: 'Users table cleared successfully' });
    } catch (error) {
        console.error('Error clearing DB:', error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
