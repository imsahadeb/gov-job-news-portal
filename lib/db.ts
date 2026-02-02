import { Pool } from 'pg';

let pool: Pool;

if (!global.pool) {
    const connectionString = process.env.DATABASE_URL;
    // Remove sslmode=require to prevent override of ssl config object and ensure rejectUnauthorized: false works
    const cleanConnectionString = connectionString?.replace('?sslmode=require', '')?.replace('&sslmode=require', '');

    pool = new Pool({
        connectionString: cleanConnectionString,
        ssl: { rejectUnauthorized: false },
    });
    console.log('DB Connection initialized with SSL:', { rejectUnauthorized: false });
    if (process.env.NODE_ENV !== 'production') {
        global.pool = pool;
    }
} else {
    pool = global.pool;
}

export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
};

// Add global declaration to avoid TS errors on global.pool
declare global {
    var pool: Pool | undefined;
}
