import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

interface BayarSewa {
  tanggal: Date;
  bukti: string;
  jumlah: string;
  penyewaan_id_sewa: string;
  booth_id_booth?: string;
  biodata_nik?: string;
}

class BayarSewaService {
  private db = Database.getInstance().getConnection();

  public async getAllBayarSewa(): Promise<RowDataPacket[]> {
    const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM bayar_sewa');
    return rows;
  }

  public async getBayarSewaById(id: number): Promise<BayarSewa | null> {
    const [result]: any = await this.db.query('SELECT * FROM bayar_sewa WHERE id = ?', [id]);
    return result.length > 0 ? result[0] : null;
  }

  public async addBayarSewa(bayarSewa: BayarSewa): Promise<void> {
    const { tanggal, bukti, jumlah, penyewaan_id_sewa, booth_id_booth, biodata_nik } = bayarSewa;
    await this.db.query(
      'INSERT INTO bayar_sewa (tanggal, bukti, jumlah, penyewaan_id_sewa, booth_id_booth, biodata_nik) VALUES (?, ?, ?, ?, ?, ?)',
      [tanggal, bukti, jumlah, penyewaan_id_sewa, booth_id_booth, biodata_nik]
    );
  }

  public async updateBayarSewa(id: number, bayarSewa: Partial<BayarSewa>): Promise<boolean> {
    const { tanggal, bukti, jumlah, penyewaan_id_sewa, booth_id_booth, biodata_nik } = bayarSewa;
    const [result]: any = await this.db.query(
      `UPDATE bayar_sewa SET tanggal = ?, bukti = ?, jumlah = ?, penyewaan_id_sewa = ?, booth_id_booth = ?, biodata_nik = ? WHERE id = ?`,
      [tanggal, bukti, jumlah, penyewaan_id_sewa, booth_id_booth, biodata_nik, id]
    );
    return result.affectedRows > 0;
  }

  public async deleteBayarSewa(id: number): Promise<boolean> {
    const [result]: any = await this.db.query('DELETE FROM bayar_sewa WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default BayarSewaService;
