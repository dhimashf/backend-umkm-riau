import { RowDataPacket, ResultSetHeader } from 'mysql2';
import Database from '../config/database';

interface Booth {
    id_booth: string;
    ukuran: string;
    status: 'DISEWA' | 'RUSAK' | 'TIDAK DISEWA';
    harga_sewa: number;
    kerusakan?: Kerusakan[]; // Menambahkan relasi dengan kerusakan
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
        const { id_booth, ukuran, status, harga_sewa } = booth;
        await this.db.query('INSERT INTO booth (id_booth, ukuran, status, harga_sewa) VALUES (?, ?, ?, ?)', [id_booth, ukuran, status, harga_sewa]);
    }

    // Memperbarui data booth
    public async updateBooth(id_booth: string, booth: Partial<Booth>): Promise<boolean> {
        const { ukuran, status, harga_sewa } = booth;
        const [result]: any = await this.db.query('UPDATE booth SET ukuran = ?, status = ?, harga_sewa = ? WHERE id_booth = ?', [ukuran, status, harga_sewa, id_booth]);
        return result.affectedRows > 0;
    }
    public async updateStatus(id_booth: string, booth: Partial<Booth>): Promise<boolean> {
        const { status} = booth;
        const [result]: any = await this.db.query('UPDATE booth SET status = ? WHERE id_booth = ?', [status, id_booth]);
        return result.affectedRows > 0;
    }

    // Menghapus booth berdasarkan ID
    public async deleteBooth(id_booth: string): Promise<boolean> {
        const [result]: any = await this.db.query('DELETE FROM booth WHERE id_booth = ?', [id_booth]);
        return result.affectedRows > 0;
    }

    // Menambahkan riwayat kerusakan
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

export default BoothService;
