import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    private static instance: Database;
    private pool: Pool;

    private constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE, // Pastikan ini merujuk ke nama database yang benar
            port: Number(process.env.DB_PORT) || 3306, // Default ke 3306 jika DB_PORT tidak ada
        });
    }

    // Static method to access the single instance
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public getConnection(): Pool {
        return this.pool;
    }
}

export default Database;
