import { RowDataPacket } from 'mysql2';
import Database from '../config/database';
import cloudinary from '../config/cloudinary';

interface Pembelian {
    id?: number;
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
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM pembelian ORDER BY id DESC');
        return rows as Pembelian[];
    }
    public async addPembelianCash(pembelian: Pembelian): Promise<{ id: number }> {
        const { tanggal_transaksi, jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin } = pembelian;
    
        // Jalankan query INSERT dan ambil ID terakhir yang dimasukkan
        const [result] = await this.db.query<any>( // Ganti RowDataPacket[] dengan any
            'INSERT INTO pembelian (tanggal_transaksi, jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin) VALUES (?, ?, ?, ?, ?, ?)',
            [tanggal_transaksi, jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin]
        );
    
        // Mengambil id yang baru dimasukkan
        const newId = result.insertId;
    
        // Kembalikan ID yang baru saja dimasukkan
        return { id: newId };
    }
    
    
    public async addPembelianCredit(pembelian: Pembelian, filePath: string): Promise<number | null> {
        try {
            // Upload file ke Cloudinary satu kali
            const uploadResponse = await cloudinary.uploader.upload(filePath, {
                folder: 'products',
            });
    
            // Dapatkan URL foto dari Cloudinary
            const fotoKTP = uploadResponse.secure_url; // Mengambil URL lengkap yang dihasilkan oleh Cloudinary
            const { tanggal_transaksi, jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin, alamat_domisili, nik, tenor } = pembelian;
    
            // Simpan data ke database, termasuk foto_ktp
            const [result] = await this.db.query<any>(
                'INSERT INTO pembelian (tanggal_transaksi, jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin, alamat_domisili, nik, tenor, foto_ktp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [tanggal_transaksi, jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin, alamat_domisili, nik, tenor, fotoKTP]
            );
    
            // Mengambil id yang baru dimasukkan
            const newId = result.insertId;
    
            // Kembalikan ID baru
            return newId;
        } catch (error) {
            console.error('Error adding credit pembelian:', error);
            return null; // Gagal
        }
    }
    

    public async getPembelianByJenisPembayaran(jenis_pembayaran: 'CASH' | 'CREDIT'): Promise<Pembelian[]> {
        const [rows] = await this.db.query<RowDataPacket[]>(
            'SELECT * FROM pembelian WHERE jenis_pembayaran = ?',
            [jenis_pembayaran]
        );
        return rows as Pembelian[];
    }
    public async getPembelianById(id: number): Promise<Pembelian[]> {
        const [rows] = await this.db.query<RowDataPacket[]>(
            'SELECT * FROM pembelian WHERE id = ?',
            [id]
        );
        return rows as Pembelian[];
    }
    public async hapusPembelian(id: number): Promise<boolean> {
        const [result]: any = await this.db.query('DELETE FROM pembelian WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
    
}

export default PembelianService;
