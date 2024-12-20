// penyewaanService.ts
import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

interface Penyewaan {
    id_sewa: string;
    mulai_sewa: Date;
    akhir_sewa: Date;
    lokasi: string;
    status: 'MENUNGGU' | 'DIPROSES' | 'DITOLAK' | 'DISETUJUI';
    booth_id_booth: string;
    biodata_nik: string;
    durasi: number;
}

class PenyewaanService {
    private db = Database.getInstance().getConnection();

    public async addPenyewaan(penyewaan: Penyewaan): Promise<void> {
        const {  mulai_sewa, akhir_sewa, lokasi, status, booth_id_booth, biodata_nik, durasi } = penyewaan;
        await this.db.query(
            'INSERT INTO penyewaan (mulai_sewa, akhir_sewa, lokasi, status, booth_id_booth, biodata_nik, durasi) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ mulai_sewa, akhir_sewa, lokasi, status, booth_id_booth, biodata_nik, durasi]
        );
    }

    public async getAllPenyewaan(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM penyewaan');
        return rows;
    }

    public async updatePenyewaan(id_sewa: string, penyewaan: Partial<Penyewaan>): Promise<boolean> {
        const { mulai_sewa, akhir_sewa, lokasi, status, booth_id_booth, durasi } = penyewaan;
    
        // Query SQL memerlukan nilai individu untuk setiap kolom
        const [result]: any = await this.db.query(
            `UPDATE penyewaan 
             SET mulai_sewa = ?, akhir_sewa = ?, lokasi = ?, status = ?, booth_id_booth = ?, durasi = ? 
             WHERE id_sewa = ?`,
            [mulai_sewa, akhir_sewa, lokasi, status, booth_id_booth, durasi, id_sewa]
        );
    
        return result.affectedRows > 0;
    }
    
    public async hapusPenyewaan(id_sewa: string): Promise<boolean> {
        const [result]: any = await this.db.query('DELETE FROM penyewaan WHERE id_sewa = ?', [id_sewa]);
        return result.affectedRows > 0;
    }
}


export default PenyewaanService;
