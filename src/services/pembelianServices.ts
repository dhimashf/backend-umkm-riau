import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

interface Pembelian {
    id: string;
    jenis_produk: string;
    ukuran: string;
    harga: string;
    jenis_pembayaran: 'CASH' | 'CREDIT';
    nama: string;
    alamat: string;
    no_hp: string;
    jenis_kelamin: string;
    alamat_domisili?: string | null;
    nik?: string | null;
    tenor?: string | null;
    foto_ktp?: Buffer | null;
}

class PembelianService {
    private db = Database.getInstance().getConnection();

    public async getAllPembelian(): Promise<Pembelian[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM pembelian');
        return rows as Pembelian[];
    }

    public async addPembelian(pembelian: Pembelian): Promise<void> {
        const {
            id, jenis_produk, ukuran, harga, jenis_pembayaran,
            nama, alamat, no_hp, jenis_kelamin, alamat_domisili, nik, tenor, foto_ktp
        } = pembelian;
        await this.db.query(
            'INSERT INTO pembelian (id, jenis_produk, ukuran, harga, jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin, alamat_domisili, nik, tenor, foto_ktp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id, jenis_produk, ukuran, harga, jenis_pembayaran, nama, alamat, no_hp, jenis_kelamin, alamat_domisili, nik, tenor, foto_ktp]
        );
    }

    public async updatePembelian(id: string, pembelian: Partial<Pembelian>): Promise<boolean> {
        const [result]: any = await this.db.query(
            'UPDATE pembelian SET ? WHERE id = ?',
            [pembelian, id]
        );
        return result.affectedRows > 0;
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
