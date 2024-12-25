import { RowDataPacket } from 'mysql2';
import Database from '../config/database';
import cloudinary from '../config/cloudinary';

interface Pembelian {
    tanggal_transaksi: Date;
    jenis_pembayaran: 'CASH' | 'CREDIT';
    nama: string;
    alamat: string;
    no_hp: string;
    jenis_kelamin: string;
    alamat_domisili?: string | null;
    nik?: string | null;
    tenor?: string | null;
    foto_ktp?: string | null;
}

class PembelianService {
    private db = Database.getInstance().getConnection();

    public async getAllPembelian(): Promise<Pembelian[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM pembelian');
        return rows as Pembelian[];
    }
    public async addPembelianCash(pembelian: Pembelian): Promise<void> {
        const { tanggal_transaksi,jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin} = pembelian;
        await this.db.query(
            'INSERT INTO pembelian (tanggal_transaksi,jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin) VALUES ( ?, ?, ?, ?, ?, ?)',
            [ tanggal_transaksi,jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin]
        );
    }
    public async addPembelianCredit(pembelian: Pembelian, filePath: string): Promise<boolean> {
        try {
           
            // Upload file ke Cloudinary satu kali
            const uploadResponse = await cloudinary.uploader.upload(filePath, {
                folder: 'products',
            });
    
            // Dapatkan public_id dari Cloudinary
            const fotoKTP = uploadResponse.secure_url; // Mengambil URL lengkap yang dihasilkan oleh Cloudinary
            const { tanggal_transaksi,jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin,alamat_domisili, nik, tenor } = pembelian;
    
            // Simpan data ke database, termasuk public_id
            await this.db.query(
                'INSERT INTO pembelian (tanggal_transaksi,jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin, alamat_domisili, nik, tenor, foto_ktp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [ tanggal_transaksi,jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin,alamat_domisili, nik, tenor, fotoKTP]
            );
    
            return true; // Berhasil
        } catch (error) {
            console.error('Error adding credit pembelian:', error);
            return false; // Gagal
        }
    }



    public async getPembelianByJenisPembayaran(jenis_pembayaran: 'CASH' | 'CREDIT'): Promise<Pembelian[]> {
        const [rows] = await this.db.query<RowDataPacket[]>(
            'SELECT * FROM pembelian WHERE jenis_pembayaran = ?',
            [jenis_pembayaran]
        );
        return rows as Pembelian[];
    }
    
}

export default PembelianService;
