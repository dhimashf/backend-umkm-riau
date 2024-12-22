import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

interface Booth {
    id_booth: string;
    ukuran: string;
    status: 'DISEWA' | 'RUSAK' | 'TIDAK DISEWA';
    harga_sewa: number;
    riwayat_kerusakan: string;
}
class BoothService {
    private db = Database.getInstance().getConnection();

    public async CekListBooths(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM booth');
        return rows;
    }
    public async CekBoothReady(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM booth WHERE status = "TIDAK DISEWA"');
        return rows;
    }

    public async getBoothByID(id_booth: string): Promise<Booth | null> {
        const [result]: any = await this.db.query('SELECT * FROM booth WHERE id_booth = ?', [id_booth]);
        return result.length > 0 ? result[0] : null;
    }

    public async createBooth(booth: Booth): Promise<void> {
        const { id_booth, ukuran, status, harga_sewa, riwayat_kerusakan } = booth;
        await this.db.query('INSERT INTO booth (id_booth, ukuran, status, harga_sewa, riwayat_kerusakan) VALUES (?, ?, ?, ?, ?)', [id_booth, ukuran, status, harga_sewa, riwayat_kerusakan]);
    }

    public async updateBooth(id_booth: string, booth: Partial<Booth>): Promise<boolean> {
        const { ukuran, status, harga_sewa, riwayat_kerusakan } = booth;
        const [result]: any = await this.db.query('UPDATE booth SET ukuran = ?, status = ?, harga_sewa = ?, riwayat_kerusakan = ? WHERE id_booth = ?', [ukuran, status, harga_sewa, riwayat_kerusakan, id_booth]);
        return result.affectedRows > 0;
    }

    public async deleteBooth(id_booth: string): Promise<boolean> {
        const [result]: any = await this.db.query('DELETE FROM booth WHERE id_booth = ?', [id_booth]);
        return result.affectedRows > 0;
    }
}


export default BoothService;
