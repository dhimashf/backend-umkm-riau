import { RowDataPacket, ResultSetHeader } from 'mysql2';
import Database from '../config/database';

interface Kerusakan {
    id: number;
    id_booth: string;
    tanggal_kerusakan: string;
    riwayat_kerusakan: string;
}

class KerusakanService {
    private db = Database.getInstance().getConnection();

    public async addKerusakan(id_booth: string, tanggal_kerusakan: string, riwayat_kerusakan: string): Promise<void> {
        await this.db.query(
            'INSERT INTO riwayat_kerusakan (id_booth, tanggal_kerusakan, riwayat_kerusakan) VALUES (?, ?, ?)',
            [id_booth, tanggal_kerusakan, riwayat_kerusakan]
        );
    }

    // Mengambil semua riwayat kerusakan
    public async getAllKerusakan(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM riwayat_kerusakan');
        return rows;
    }

    // Mengambil riwayat kerusakan berdasarkan ID booth
    public async getKerusakanById(id_booth: string): Promise<Kerusakan[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM riwayat_kerusakan WHERE id_booth = ?', [id_booth]);
        return rows as Kerusakan[];
    }
    // BoothService.ts
    public async deleteKerusakan(id: number): Promise<boolean> {
        const [result] = await this.db.query<ResultSetHeader>('DELETE FROM riwayat_kerusakan WHERE id = ?', [id]);
        return result.affectedRows > 0; // Menggunakan result yang bertipe ResultSetHeader
    }
}

export default KerusakanService;