import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

class AkunService {
    private db = Database.getInstance().getConnection();

    public async getAllAkun(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM AKUN');
        return rows;
    }

    public async getAkunByPhone(no_hp: string): Promise<any | null> {
        const [result]: any = await this.db.query(
            `SELECT * FROM AKUN WHERE no_hp = ?`,
            [no_hp]
        );
        return result.length > 0 ? result[0] : null;
    }
}

export default AkunService;