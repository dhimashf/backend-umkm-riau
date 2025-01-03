import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

interface ProdukPembelian {
    id?: number;
    id_pembelian: number;
    jenis_produk:'MEJA' | 'ETALASE' | 'GEROBAK' | 'KURSI' | 'BOOTH'
    ukuran: string;
    harga: number;
    jumlah: number;
    }

class ProdukPembelianService {
    private db = Database.getInstance().getConnection();

    public async getAllProdukPembelian(): Promise<{ data: ProdukPembelian[]; totalJumlah: number }> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM produk_pembelian');
        
        // Menghitung total jumlah
        const totalJumlah = rows.reduce((total, row) => total + row.jumlah, 0);
        
        // Mengembalikan daftar produk dan total jumlah
        return {
            data: rows as ProdukPembelian[],
            totalJumlah,
        };
    }
    
    /**
     * Tambahkan produk ke tabel produk_pembelian
     * @param produkPembelian Data produk yang akan ditambahkan
     */
    public async addBarangCash(produkPembelian: ProdukPembelian): Promise<void> {
        const { id_pembelian, ukuran, harga, jumlah, jenis_produk } = produkPembelian;
    
        // Validasi input (jika diperlukan)
        if (!id_pembelian || !ukuran || !harga || !jumlah || !jenis_produk) {
            throw new Error('Semua field harus diisi');
        }
    
        // Hitung subtotal otomatis
        const subtotal = harga * jumlah;
    
        // Perbaikan pada query, pastikan jumlah nilai sesuai dengan jumlah kolom
        await this.db.query(
            'INSERT INTO produk_pembelian (id_pembelian, jenis_produk, ukuran, harga, jumlah, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
            [id_pembelian, jenis_produk, ukuran, harga, jumlah, subtotal]
        );
    }
    

    /**
     * Mendapatkan semua produk berdasarkan id_pembelian
     * @param id_pembelian ID pembelian
     * @returns Daftar produk pembelian
     */
    public async getProdukByPembelian(id_pembelian: number): Promise<{ produk: ProdukPembelian[], totalTransaksi: number }> {
        const [rows] = await this.db.query<RowDataPacket[]>(
            'SELECT * FROM produk_pembelian WHERE id_pembelian = ?',
            [id_pembelian]
        );
        
        // Menghitung total transaksi
        const produk = rows as ProdukPembelian[];
        const totalTransaksi = produk.reduce((total, item) => total + (item.harga * item.jumlah), 0);
    
        return {
            produk, // Daftar produk pembelian
            totalTransaksi, // Total transaksi
        };
    }
    public async hapusProdukPembelian(id_pembelian: number): Promise<boolean> {
        if (!id_pembelian || isNaN(id_pembelian)) {
            throw new Error('ID pembelian tidak valid.');
        }

        try {
            const [result]: any = await this.db.query(
                'DELETE FROM produk_pembelian WHERE id_pembelian = ?',
                [id_pembelian]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting produk pembelian:', error);
            throw new Error('Gagal menghapus produk pembelian.');
        }
    }
    
}

export default ProdukPembelianService;
