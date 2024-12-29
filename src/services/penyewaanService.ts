import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

interface Penyewaan {
    id_sewa: number;
    mulai_sewa: Date;
    akhir_sewa: Date;
    lokasi: string;
    status: 'MENUNGGU' | 'DIPROSES' | 'DITOLAK' | 'DISETUJUI'| 'SELESAI';
    booth_id_booth: string;
    biodata_nik: string;
    durasi: number;
    permintaan_dibuat: Date;
}

class PenyewaanService {
    private db = Database.getInstance().getConnection();

    // Menambahkan penyewaan baru
    public async addPenyewaan(penyewaan: Penyewaan): Promise<void> {
        const { mulai_sewa, akhir_sewa, lokasi, biodata_nik, durasi } = penyewaan;
        const status = 'MENUNGGU'; // Menetapkan status default
        
        await this.db.query(
            'INSERT INTO penyewaan (mulai_sewa, akhir_sewa, lokasi, status, biodata_nik, durasi) VALUES (?, ?, ?, ?, ?, ?)',
            [mulai_sewa, akhir_sewa, lokasi, status, biodata_nik, durasi]
        );
    }

    // Mengambil semua data penyewaan
    public async getAllPenyewaan(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM penyewaan');
        return rows;
    }

    // Mengambil lokasi booth
    public async getLokasiBooth(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT b.nama,p.lokasi,p.booth_id_booth FROM penyewaan p,biodata b WHERE b.nik = p.biodata_nik');
        return rows;
    }

    // Mengambil penyewaan berdasarkan nik
    public async getPenyewaanByNik(biodata_nik: string): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM penyewaan WHERE biodata_nik = ?', [biodata_nik]);
        return rows;
    }

    // Mengupdate penyewaan dan status booth
    public async updatePenyewaan(biodata_nik: string, penyewaan: Partial<Penyewaan>): Promise<boolean> {
        const { mulai_sewa, akhir_sewa, status, booth_id_booth } = penyewaan;
        
        const connection = await this.db.getConnection(); // Menggunakan transaksi untuk konsistensi
        try {
            await connection.beginTransaction();

            // Update penyewaan
            const [result]: any = await connection.query(
                `UPDATE penyewaan 
                 SET mulai_sewa = ?, akhir_sewa = ?, status = ?, booth_id_booth = ? 
                 WHERE biodata_nik = ?`,
                [mulai_sewa, akhir_sewa, status, booth_id_booth, biodata_nik]
            );

            // Jika ada perubahan pada penyewaan, update status booth menjadi 'DISEWA'
            if (result.affectedRows > 0 && booth_id_booth) {
                await connection.query(
                    `UPDATE booth 
                     SET status = 'DISEWA' 
                     WHERE id_booth = ?`,
                    [booth_id_booth]
                );
            }

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            console.error('Error updating penyewaan and booth status:', error);
            return false;
        }
    }

    // Mengupdate status penyewaan
    public async updateStatusPenyewaan(
        id_sewa: number,
        status: 'MENUNGGU' | 'DIPROSES' | 'DITOLAK' | 'DISETUJUI' | 'SELESAI'
    ): Promise<boolean> {
        try {
            // Validasi untuk memastikan hanya status "SELESAI" yang dapat diterapkan
            if (status !== 'SELESAI') {
                console.error('Status yang diberikan bukan "SELESAI".');
                return false;
            }
    
            // Jalankan query untuk memperbarui status
            const [result]: any = await this.db.query(
                `UPDATE penyewaan 
                 SET status = ? 
                 WHERE id_sewa = ?`,
                [status, id_sewa] // Menyertakan id_sewa dan status
            );
    
            // Cek apakah ada baris yang terpengaruh
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating status penyewaan:', error);
            return false; // Jika terjadi error, return false
        }
    }
    
    public async updateBoothPenyewaan(id_sewa: number, booth_id_booth: string): Promise<boolean> {
        try {
            const [result]: any = await this.db.query(
                `UPDATE penyewaan 
                 SET booth_id_booth = ? 
                 WHERE id_sewa = ?`,
                [booth_id_booth, id_sewa] // Menyertakan id_sewa yang sudah dalam format number
            );
    
            // Cek apakah ada baris yang terpengaruh oleh query
            return result.affectedRows > 0; // Jika ada baris yang terpengaruh, return true
        } catch (error) {
            console.error('Error updating status penyewaan:', error);
            return false; // Jika terjadi error, return false
        }
    }
    // Menghapus penyewaan berdasarkan id_sewa
    public async hapusPenyewaan(id_sewa: number): Promise<boolean> {
        const [result]: any = await this.db.query('DELETE FROM penyewaan WHERE id_sewa = ?', [id_sewa]);
        return result.affectedRows > 0;
    }
    public async getPenyewaanByBoothId(booth_id_booth: string): Promise<RowDataPacket[]> {
        try {
            const [rows] = await this.db.query<RowDataPacket[]>(
                'SELECT * FROM penyewaan WHERE booth_id_booth = ?',
                [booth_id_booth]
            );
            return rows;
        } catch (error) {
            console.error('Error fetching penyewaan by booth ID:', error);
            throw error;
        }
    }
}

export default PenyewaanService;
