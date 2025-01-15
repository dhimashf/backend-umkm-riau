import { RowDataPacket, ResultSetHeader } from 'mysql2';
import Database from '../config/database';
import cloudinary from '../config/cloudinary';

interface Kerusakan {
    id_booth: string;
    tanggal_kerusakan: string;
    riwayat_kerusakan: string;
    bukti_kerusakan: string;
}

class KerusakanService {
    private db = Database.getInstance().getConnection();

    public async addKerusakan(kerusakan: Kerusakan, filePath: string): Promise<boolean> {
       try {
                  
           
                   // Upload file ke Cloudinary satu kali
                   const uploadResponse = await cloudinary.uploader.upload(filePath, {
                       folder: 'products',
                   });
           
                   // Dapatkan public_id dari Cloudinary
                   const buktiPublicId = uploadResponse.secure_url; // Mengambil URL lengkap yang dihasilkan oleh Cloudinary
                   const { id_booth, tanggal_kerusakan, riwayat_kerusakan } = kerusakan;
           
                   // Simpan data ke database, termasuk public_id
                   await this.db.query(
                       'INSERT INTO riwayat_kerusakan (id_booth, tanggal_kerusakan, riwayat_kerusakan, bukti_kerusakan) VALUES (?, ?, ?, ?)',
                       [id_booth, tanggal_kerusakan, riwayat_kerusakan, buktiPublicId]
                   );
           
                   return true; // Berhasil
               } catch (error) {
                   console.error('Error adding kerusakan:', error);
                   return false; // Gagal
               }
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