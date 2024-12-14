// src/service/dokumentasiService.ts
import { RowDataPacket } from 'mysql2';
import Database from '../config/database';
import cloudinary from '../config/cloudinary';

interface Dokumentasi {
    id: string;
    jenis: string;
    ukuran: string;
    harga: number;
    foto: string; // public_id dari Cloudinary
}

class DokumentasiService {
    private db = Database.getInstance().getConnection();

    // Mendapatkan semua dokumentasi
    public async getAllDokumentasi(): Promise<Dokumentasi[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM dokumentasi');
        return rows.map((row: any) => ({
            ...row,
            foto: cloudinary.url(row.foto), // Konversi public_id ke URL
        }));
    }

    // Mendapatkan dokumentasi berdasarkan ID
    public async getDokumentasiByID(id: string): Promise<Dokumentasi | null> {
        const [result]: any = await this.db.query('SELECT * FROM dokumentasi WHERE id = ?', [id]);
        if (result.length > 0) {
            const row = result[0];
            return {
                ...row,
                foto: cloudinary.url(row.foto), // Konversi public_id ke URL
            };
        }
        return null;
    }

    // Menambahkan dokumentasi baru
    public async addDokumentasi(dokumentasi: Dokumentasi, filePath: string): Promise<boolean> {
        try {
            // Validasi apakah filePath sudah ada
            if (!filePath) {
                throw new Error('File path tidak valid.');
            }
    
            // Upload file ke Cloudinary satu kali
            const uploadResponse = await cloudinary.uploader.upload(filePath, {
                folder: 'products',
            });
    
            // Dapatkan public_id dari Cloudinary
            const fotoPublicId = uploadResponse.public_id;
            const { id, jenis, ukuran, harga } = dokumentasi;
    
            // Simpan data ke database, termasuk public_id
            await this.db.query(
                'INSERT INTO dokumentasi (id, jenis, ukuran, harga, foto) VALUES (?, ?, ?, ?, ?)',
                [id, jenis, ukuran, harga, fotoPublicId]
            );
    
            return true; // Berhasil
        } catch (error) {
            console.error('Error adding dokumentasi:', error);
            return false; // Gagal
        }
    }
    

    // Memperbarui dokumentasi
    public async updateDokumentasi(
        id: string,
        dokumentasi: Partial<Dokumentasi>,
        filePath?: string // Tambahkan opsional filePath untuk file baru
    ): Promise<boolean> {
        try {
            const { jenis, ukuran, harga } = dokumentasi;
    
            // Ambil data foto lama dari database
            const [currentData]: any = await this.db.query('SELECT foto FROM dokumentasi WHERE id = ?', [id]);
            if (currentData.length === 0) {
                throw new Error('Dokumentasi tidak ditemukan.');
            }
    
            let fotoPublicId = currentData[0].foto; // Foto lama
    
            // Jika ada file baru, upload ke Cloudinary dan perbarui foto
            if (filePath) {
                // Hapus foto lama dari Cloudinary
                if (fotoPublicId) {
                    await cloudinary.uploader.destroy(fotoPublicId);
                }
    
                // Upload foto baru
                const uploadResponse = await cloudinary.uploader.upload(filePath, {
                    folder: 'products',
                });
                fotoPublicId = uploadResponse.public_id; // Foto baru
            }
    
            // Update database (jika fotoPublicId tetap sama, berarti foto tidak diubah)
            const [result]: any = await this.db.query(
                'UPDATE dokumentasi SET jenis = ?, ukuran = ?, harga = ?, foto = ? WHERE id = ?',
                [jenis, ukuran, harga, fotoPublicId, id]
            );
    
            return result.affectedRows > 0; // Berhasil jika ada baris yang diperbarui
        } catch (error) {
            console.error('Error updating dokumentasi:', error);
            throw error;
        }
    }

    // Menghapus dokumentasi
    public async deleteDokumentasi(id: string): Promise<boolean> {
        try {
            // Dapatkan data dokumentasi untuk mengambil public_id
            const [currentData]: any = await this.db.query('SELECT foto FROM dokumentasi WHERE id = ?', [id]);
            if (currentData.length > 0) {
                const fotoPublicId = currentData[0].foto;
                if (fotoPublicId) {
                    // Hapus file dari Cloudinary
                    await cloudinary.uploader.destroy(fotoPublicId);
                }
            }

            // Hapus dari database
            const [result]: any = await this.db.query('DELETE FROM dokumentasi WHERE id = ?', [id]);
            return result.affectedRows > 0; // Berhasil dihapus jika ada baris yang terpengaruh
        } catch (error) {
            console.error('Error deleting dokumentasi:', error);
            return false; // Gagal
        }
    }
}

export default DokumentasiService;
