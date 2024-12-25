import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

interface ProdukPembelian {
    id?: number;
    id_pembelian: number;
    ukuran: string;
    harga: number;
    jumlah: number;
    // Subtotal tidak perlu dimasukkan oleh user, akan dihitung otomatis
    }

class ProdukPembelianService {
    private db = Database.getInstance().getConnection();

    public async getAllProdukPembelian(): Promise<ProdukPembelian[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM produk_pembelian');
        return rows as ProdukPembelian[];
    }
    /**
     * Tambahkan produk ke tabel produk_pembelian
     * @param produkPembelian Data produk yang akan ditambahkan
     */
    public async addBarangCash(produkPembelian: ProdukPembelian): Promise<void> {
        const { id_pembelian, ukuran, harga, jumlah } = produkPembelian;

        // Hitung subtotal otomatis
        const subtotal = harga * jumlah;

        await this.db.query(
            'INSERT INTO produk_pembelian (id_pembelian, ukuran, harga, jumlah, subtotal) VALUES (?, ?, ?, ?, ?)',
            [id_pembelian, ukuran, harga, jumlah, subtotal]
        );
    }

    /**
     * Mendapatkan semua produk berdasarkan id_pembelian
     * @param id_pembelian ID pembelian
     * @returns Daftar produk pembelian
     */
    public async getProdukByPembelian(id_pembelian: number): Promise<ProdukPembelian[]> {
        const [rows] = await this.db.query<RowDataPacket[]>(
            'SELECT * FROM produk_pembelian WHERE id_pembelian = ?',
            [id_pembelian]
        );
        return rows as ProdukPembelian[];
    }
}

export default ProdukPembelianService;
