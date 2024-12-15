import { RowDataPacket } from 'mysql2';
import Database from '../config/database';
import bcrypt from 'bcrypt';

class AkunService {
    private db = Database.getInstance().getConnection();

    public async getAllAkun(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM AKUN');
        return rows;
    }

    public async getAkunByPhone(no_hp: string): Promise<any | null> {
        const [result]: any = await this.db.query(
            'SELECT * FROM AKUN WHERE no_hp = ?',
            [no_hp]
        );
        return result.length > 0 ? result[0] : null;
    }

    public async register(no_hp: string, password: string): Promise<boolean> {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.db.query(
            'INSERT INTO AKUN (no_hp, password) VALUES (?, ?)',
            [no_hp, hashedPassword]
        );
        return true;
    }

    public async updatePassword(no_hp: string, newPassword: string): Promise<boolean> {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.db.query(
            'UPDATE AKUN SET password = ? WHERE no_hp = ?',
            [hashedPassword, no_hp]
        );
        return true;
    }

    public async validateLogin(no_hp: string, password: string): Promise<boolean> {
        const akun = await this.getAkunByPhone(no_hp);
        if (!akun) return false;
        return bcrypt.compare(password, akun.password);
    }
}

export default AkunService;
