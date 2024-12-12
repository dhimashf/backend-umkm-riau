// src/service/dokumentasiService.ts
import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

interface Dokumentasi {
    id: string;
    jenis: string;
    ukuran: string;
    harga: number;
    foto: string;
}

class DokumentasiService {
    private db = Database.getInstance().getConnection();

    public async getAllDokumentasi(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM dokumentasi');
        return rows;
    }

    public async getDokumentasiByID(id: string): Promise<Dokumentasi | null> {
        const [result]: any = await this.db.query('SELECT * FROM dokumentasi WHERE id = ?', [id]);
        return result.length > 0 ? result[0] : null;
    }

    public async createDokumentasi(dokumentasi: Dokumentasi): Promise<void> {
        const { id, jenis, ukuran, harga, foto } = dokumentasi;
        await this.db.query('INSERT INTO dokumentasi (id, jenis, ukuran, harga, foto) VALUES (?, ?, ?, ?, ?)', [id, jenis, ukuran, harga, foto]);
    }

    public async updateDokumentasi(id: string, dokumentasi: Partial<Dokumentasi>): Promise<boolean> {
        const { jenis, ukuran, harga, foto } = dokumentasi;
        const [result]: any = await this.db.query('UPDATE dokumentasi SET jenis = ?, ukuran = ?, harga = ?, foto = ? WHERE id = ?', [jenis, ukuran, harga, foto, id]);
        return result.affectedRows > 0;
    }

    public async deleteDokumentasi(id: string): Promise<boolean> {
        const [result]: any = await this.db.query('DELETE FROM dokumentasi WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

export default DokumentasiService;
