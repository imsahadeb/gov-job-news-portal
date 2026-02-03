import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        await query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS resume_url TEXT,
            ADD COLUMN IF NOT EXISTS address TEXT,
            ADD COLUMN IF NOT EXISTS dob DATE,
            ADD COLUMN IF NOT EXISTS mobile VARCHAR(20),
            ADD COLUMN IF NOT EXISTS sex VARCHAR(10),
            ADD COLUMN IF NOT EXISTS photo_url TEXT,
            ADD COLUMN IF NOT EXISTS bio TEXT,
            ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
            ADD COLUMN IF NOT EXISTS portfolio_url TEXT;
        `);

        return NextResponse.json({ message: 'Database schema updated successfully.' });
    } catch (error: any) {
        console.error('Migration error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
