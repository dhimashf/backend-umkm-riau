// penyewaanService.ts
import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

interface Penyewaan {
    id_sewa: number;
    mulai_sewa: Date;
    akhir_sewa: Date;
    lokasi: string;
    status: 'MENUNGGU' | 'DIPROSES' | 'DITOLAK' | 'DISETUJUI';
    booth_id_booth: string;
    biodata_nik: string;
    durasi: number;
    permintaan_dibuat : Date;
    
}

class PenyewaanService {
    private db = Database.getInstance().getConnection();

    public async addPenyewaan(penyewaan: Penyewaan): Promise<void> {
        const { mulai_sewa, akhir_sewa, lokasi, biodata_nik, durasi } = penyewaan;
        const status = 'MENUNGGU'; // Menetapkan status default
        
        await this.db.query(
            'INSERT INTO penyewaan (mulai_sewa, akhir_sewa, lokasi, status, biodata_nik, durasi) VALUES (?, ?, ?, ?, ?, ?)',
            [mulai_sewa, akhir_sewa, lokasi, status, biodata_nik, durasi]
        );
    }

    public async getAllPenyewaan(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM penyewaan');
        return rows;
    }
    public async getLokasiBooth(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT b.nama,p.lokasi,p.booth_id_booth FROM penyewaan p,biodata b WHERE b.nik = p.biodata_nik');
        return rows;
    }
    public async getPenyewaanByNik(biodata_nik: string): Promise<RowDataPacket[]> {
        // Memastikan query menerima biodata_nik sebagai parameter
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM penyewaan WHERE biodata_nik = ?', [biodata_nik]);
        return rows;
    }

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
    
            if (result.affectedRows > 0 && booth_id_booth) {
                // Update status booth menjadi 'DISEWA'
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
        } finally {
            connection.release();
        }
    }
    
    public async hapusPenyewaan(id_sewa: string): Promise<boolean> {
        const [result]: any = await this.db.query('DELETE FROM penyewaan WHERE id_sewa = ?', [id_sewa]);
        return result.affectedRows > 0;
    }
}


export default PenyewaanService;
