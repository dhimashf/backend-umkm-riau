import { RowDataPacket } from 'mysql2';
import Database from '../config/database';
import cloudinary from '../config/cloudinary';

interface BuktiBayar {
    id?: number;
    id_pembelian: number;
    tanggal: string;
    bukti: string;
    jumlah: number;
}


class BuktiBayarService {
    private db = Database.getInstance().getConnection();

    public async getAllBuktiBayar(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM bukti_bayar');
        return rows;
    }

    public async addBuktiBayar(buktiBayar: BuktiBayar, filePath: string): Promise<boolean> {
        try {
                
                    // Upload file ke Cloudinary satu kali
                    const uploadResponse = await cloudinary.uploader.upload(filePath, {
                        folder: 'products',
                    });
            
                    // Dapatkan public_id dari Cloudinary
                    const buktiPublicId = uploadResponse.secure_url; // Mengambil URL lengkap yang dihasilkan oleh Cloudinary
                    const {id_pembelian, tanggal, jumlah } = buktiBayar;
            
                    // Simpan data ke database, termasuk public_id
                    await this.db.query(
                        'INSERT INTO bukti_bayar (id_pembelian, tanggal, bukti, jumlah) VALUES (?, ?, ?, ?)',
                        [id_pembelian, tanggal, buktiPublicId, jumlah]
                    );
            
                    return true; // Berhasil
                } catch (error) {
                    console.error('Error adding credit pembelian:', error);
                    return false; // Gagal
                }
        }

    public async getBuktiByPembelianId(id_pembelian: number): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>(
            'SELECT * FROM bukti_bayar WHERE id_pembelian = ?',
            [id_pembelian]
        );
        return rows;
    }

        public async deleteBuktiBayar(id: string): Promise<boolean> {
            try {
                // Dapatkan data dokumentasi untuk mengambil public_id
                const [currentData]: any = await this.db.query('SELECT bukti FROM bukti_bayar WHERE id = ?', [id]);
                if (currentData.length > 0) {
                    const buktiPublicId = currentData[0].foto;
                    if (buktiPublicId) {
                        // Hapus file dari Cloudinary
                        await cloudinary.uploader.destroy(buktiPublicId);
                    }
                }
    
                // Hapus dari database
                const [result]: any = await this.db.query('DELETE FROM bukti_bayar WHERE id = ?', [id]);
                return result.affectedRows > 0; // Berhasil dihapus jika ada baris yang terpengaruh
            } catch (error) {
                console.error('Error deleting dokumentasi:', error);
                return false; // Gagal
            }
        }
}

export default BuktiBayarService;
