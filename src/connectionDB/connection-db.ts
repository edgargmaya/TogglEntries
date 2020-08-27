import { createPool, Pool } from 'mysql2/promise'

export async function connect(): Promise<Pool> {
    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: 'puma2305',
        database: 'toggl_entries_bd',
        connectionLimit: 15
    });
    return connection;
}