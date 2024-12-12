import Database from '../config/database';
import { RowDataPacket } from 'mysql2/promise'; // Import tipe data bawaan dari mysql2

class biodataService {
    private db = Database.getInstance().getConnection();

    // Mendapatkan semua biodata
    public async CekListBiodata(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM biodata');
        return rows;
    }

    // Mendapatkan biodata berdasarkan NIK
    public async CekBiodataByNik(nik: string): Promise<RowDataPacket | null> {
        const [result] = await this.db.query<RowDataPacket[]>(
            `SELECT * FROM biodata WHERE nik = ?`, 
            [nik]
        );
        return result.length > 0 ? result[0] : null;
    }
}

export default biodataService;
