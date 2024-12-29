import { RowDataPacket, ResultSetHeader } from 'mysql2';
import Database from '../config/database';

interface Booth {
    id_booth: string;
    ukuran: string;
    status: 'DISEWA' | 'RUSAK' | 'TIDAK DISEWA';
}

interface Kerusakan {
    id: number;
    id_booth: string;
    tanggal_kerusakan: string;
    riwayat_kerusakan: string;
}

class BoothService {
    private db = Database.getInstance().getConnection();

    // Mengambil semua booth
    public async CekListBooths(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM booth');
        return rows;
    }

    // Mengambil booth yang statusnya "TIDAK DISEWA"
    public async CekBoothReady(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM booth WHERE status = "TIDAK DISEWA"');
        return rows;
    }

    // Mengambil booth berdasarkan ID
    public async getBoothByID(id_booth: string): Promise<Booth | null> {
        const [result]: any = await this.db.query('SELECT * FROM booth WHERE id_booth = ?', [id_booth]);
        return result.length > 0 ? result[0] : null;
    }

    // Menambahkan booth baru
    public async createBooth(booth: Booth): Promise<void> {
        const { id_booth, ukuran, status } = booth;
        await this.db.query('INSERT INTO booth (id_booth, ukuran, status) VALUES (?, ?, ?)', [id_booth, ukuran, status]);
    }

    // Memperbarui data booth
// Fungsi untuk update booth secara umum

// Fungsi untuk update status booth
public async updateStatus(id_booth: string, status: string): Promise<boolean> {
    const query = 'UPDATE booth SET status = ? WHERE id_booth = ?';
    const [result]: any = await this.db.query(query, [status, id_booth]);
    return result.affectedRows > 0;
}

// Memperbarui status booth

    // Menghapus booth berdasarkan ID
    public async deleteBooth(id_booth: string): Promise<boolean> {
        const [result]: any = await this.db.query('DELETE FROM booth WHERE id_booth = ?', [id_booth]);
        return result.affectedRows > 0;
    }
    

}

export default BoothService;
