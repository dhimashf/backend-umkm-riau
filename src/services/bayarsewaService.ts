import { RowDataPacket } from 'mysql2';
import Database from '../config/database';
import cloudinary from '../config/cloudinary';

interface BayarSewa {
    id?: number;
    id_sewa: number;
    tanggal: string;
    bukti: string;
    jumlah: number;
}


class BayarSewaService {
    private db = Database.getInstance().getConnection();

    public async getAllBayarSewa(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM bayar_sewa');
        return rows;
    }

    public async addBayarSewa(BayarSewa: BayarSewa, filePath: string): Promise<boolean> {
        try {
                
                    // Upload file ke Cloudinary satu kali
                    const uploadResponse = await cloudinary.uploader.upload(filePath, {
                        folder: 'products',
                    });
            
                    // Dapatkan public_id dari Cloudinary
                    const sewaPublicId = uploadResponse.secure_url; // Mengambil URL lengkap yang dihasilkan oleh Cloudinary
                    const {id_sewa, tanggal, jumlah } = BayarSewa;
            
                    // Simpan data ke database, termasuk public_id
                    await this.db.query(
                        'INSERT INTO bayar_sewa (id_sewa, tanggal, bukti, jumlah) VALUES (?, ?, ?, ?)',
                        [id_sewa, tanggal, sewaPublicId, jumlah]
                    );
            
                    return true; // Berhasil
                } catch (error) {
                    console.error('Error adding credit sewa:', error);
                    return false; // Gagal
                }
        }

    public async getBayarSewaBysewaId(id_sewa: number): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>(
            'SELECT * FROM bayar_sewa WHERE id_sewa = ?',
            [id_sewa]
        );
        return rows;
    }

        public async deleteBayarSewa(id: string): Promise<boolean> {
            try {
                // Dapatkan data dokumentasi untuk mengambil public_id
                const [currentData]: any = await this.db.query('SELECT bukti FROM bayar_sewa WHERE id = ?', [id]);
                if (currentData.length > 0) {
                    const buktiPublicId = currentData[0].foto;
                    if (buktiPublicId) {
                        // Hapus file dari Cloudinary
                        await cloudinary.uploader.destroy(buktiPublicId);
                    }
                }
    
                // Hapus dari database
                const [result]: any = await this.db.query('DELETE FROM bayar_sewa WHERE id = ?', [id]);
                return result.affectedRows > 0; // Berhasil dihapus jika ada baris yang terpengaruh
            } catch (error) {
                console.error('Error deleting dokumentasi:', error);
                return false; // Gagal
            }
        }
}

export default BayarSewaService;
