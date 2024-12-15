import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

interface Kredit {
    tanggal: Date;
    bukti: string;
    jumlah: string;
    pembelian_id: string;
}
class KreditService {
    private db = Database.getInstance().getConnection();

    public async CekRiwayatPembayaran(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM beli_kredit');
        return rows;
    }

    public async getRiwayatPembayaranByID(pembelian_id: string): Promise<Kredit | null> {
        const [result]: any = await this.db.query('SELECT * FROM beli_kredit WHERE pembelian_id = ?', [ pembelian_id ]);
        return result.length > 0 ? result[0] : null;
    }

    public async addRiwayatPembayaran(kredit: Kredit): Promise<void> {
        const { tanggal,bukti,jumlah,pembelian_id } = kredit;
        await this.db.query('INSERT INTO beli_kredit (tanggal,bukti,jumlah,pembelian_id) VALUES (?, ?, ?, ?)', [tanggal,bukti,jumlah,pembelian_id]);
    }

public async updateRiwayatPembayaran(id: string, kredit: Partial<Kredit>): Promise<boolean> {
    const { tanggal, bukti, jumlah, pembelian_id } = kredit;
    const [result]: any = await this.db.query(
        `UPDATE beli_kredit 
         SET tanggal = ?, bukti = ?, jumlah = ?, pembelian_id = ? 
         WHERE id = ?`,
        [tanggal, bukti, jumlah, pembelian_id, id] // Perbaikan urutan parameter
    );
    return result.affectedRows > 0;
}


    public async deleteRiwayatPembayaran(id: string): Promise<boolean> {
        const [result]: any = await this.db.query('DELETE FROM beli_kredit WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}


export default KreditService;
