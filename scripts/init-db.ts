import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { Pool } from 'pg';

async function main() {
    console.log('Initializing database...');
    console.log('Database URL available:', !!process.env.DATABASE_URL);

    const connectionString = process.env.DATABASE_URL;
    const cleanConnectionString = connectionString?.replace('?sslmode=require', '')?.replace('&sslmode=require', '');

    const pool = new Pool({
        connectionString: cleanConnectionString,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('Successfully created users table.');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        await pool.end();
    }
}

main();
