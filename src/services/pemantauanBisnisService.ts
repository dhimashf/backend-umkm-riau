import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

class PemantauanBisnisService {
    private db = Database.getInstance().getConnection();

    public async getTotalPendapatanBulanIni(): Promise<number> {
        const query = `
            SELECT 
                COALESCE(SUM(bayar_sewa.jumlah), 0) + COALESCE(SUM(bukti_bayar.jumlah), 0) AS total_pendapatan
            FROM 
                bayar_sewa 
            LEFT JOIN bukti_bayar ON MONTH(bayar_sewa.tanggal) = MONTH(bukti_bayar.tanggal) 
                AND YEAR(bayar_sewa.tanggal) = YEAR(bukti_bayar.tanggal)
            WHERE 
                MONTH(bayar_sewa.tanggal) = MONTH(CURRENT_DATE()) 
                AND YEAR(bayar_sewa.tanggal) = YEAR(CURRENT_DATE())
        `;

        // Execute the query and get the result
        const [rows]: any = await this.db.query(query);

        // Ensure the total is returned as a number (parse to integer)
        const totalPendapatan = parseInt(rows[0].total_pendapatan, 10) || 0;

        return totalPendapatan;
    }
    public async getPenyewaanBiodataByBooth(id_booth: string): Promise<any[]> {
        const query = `
            SELECT 
                b.nama, 
                a.no_hp,  -- Mengambil no_hp dari tabel AKUN
                b.alamat_domisili, 
                p.lokasi, 
                b.nik, 
                b.jenis_kelamin, 
                p.mulai_sewa AS awal_penyewaan, 
                p.akhir_sewa AS akhir_penyewaan, 
                b.foto_ktp,
                -- Riwayat Pembayaran
                (SELECT GROUP_CONCAT(CONCAT('Tanggal: ', bayar_sewa.tanggal, ', Jumlah: Rp ', bayar_sewa.jumlah, ', Bukti: ', bayar_sewa.bukti) SEPARATOR ' | ') 
                 FROM bayar_sewa 
                 WHERE bayar_sewa.id_sewa = p.id_sewa) AS riwayat_pembayaran,
                -- Riwayat Kerusakan
                (SELECT COALESCE(kerusakan.riwayat_kerusakan, 'Tidak ada riwayat kerusakan.') 
                 FROM riwayat_kerusakan kerusakan
                 WHERE kerusakan.id_booth = p.booth_id_booth 
                 ORDER BY kerusakan.tanggal_kerusakan DESC LIMIT 1) AS riwayat_kerusakan
            FROM 
                penyewaan p
            JOIN biodata b ON p.biodata_nik = b.nik
            JOIN booth bo ON p.booth_id_booth = bo.id_booth
            JOIN AKUN a ON b.akun_id_akun = a.id_akun  -- Menggabungkan tabel AKUN untuk mendapatkan no_hp
            WHERE p.booth_id_booth = ?  
        `;
    
        // Execute the query with the id_booth parameter
        const [rows]: any = await this.db.query(query, [id_booth]);
    
        return rows as RowDataPacket[]; // Cast the result to RowDataPacket[]
    }     
}



export default PemantauanBisnisService;
