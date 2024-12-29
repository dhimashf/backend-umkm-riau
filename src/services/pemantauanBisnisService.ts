import { RowDataPacket } from 'mysql2';
import Database from '../config/database';

class PemantauanBisnisService {
    private db = Database.getInstance().getConnection();

    public async getTotalPendapatanBulanIni(): Promise<number> {
        const query = `
            SELECT 
                COALESCE((
                    SELECT SUM(jumlah) 
                    FROM bayar_sewa 
                    WHERE tanggal BETWEEN DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01') 
                                      AND LAST_DAY(CURRENT_DATE())
                ), 0) 
                +
                COALESCE((
                    SELECT SUM(jumlah) 
                    FROM bukti_bayar 
                    WHERE tanggal BETWEEN DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01') 
                                      AND LAST_DAY(CURRENT_DATE())
                ), 0) 
                +
                COALESCE((
                    SELECT SUM(jumlah) 
                    FROM riwayat_sewa 
                    WHERE tanggal BETWEEN DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01') 
                                      AND LAST_DAY(CURRENT_DATE())
                ), 0) AS total_pendapatan
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
    GROUP_CONCAT(CONCAT('Tanggal: ', bayar_sewa.tanggal, ', Jumlah: Rp ', bayar_sewa.jumlah, ', Bukti: ', bayar_sewa.bukti) SEPARATOR ' | ') AS riwayat_pembayaran,
    -- Riwayat Kerusakan
    GROUP_CONCAT(DISTINCT COALESCE(kerusakan.riwayat_kerusakan, 'Tidak ada riwayat kerusakan.') ORDER BY kerusakan.tanggal_kerusakan DESC SEPARATOR ' | ') AS riwayat_kerusakan
    FROM 
        penyewaan p
    JOIN biodata b ON p.biodata_nik = b.nik
    JOIN booth bo ON p.booth_id_booth = bo.id_booth
    JOIN AKUN a ON b.akun_id_akun = a.id_akun  -- Menggabungkan tabel AKUN untuk mendapatkan no_hp
    LEFT JOIN bayar_sewa ON bayar_sewa.id_sewa = p.id_sewa  -- Menggabungkan riwayat pembayaran
    LEFT JOIN riwayat_kerusakan kerusakan ON kerusakan.id_booth = p.booth_id_booth  -- Menggabungkan riwayat kerusakan
    WHERE p.booth_id_booth = ?
    GROUP BY p.id_sewa;  

  
        `;
    
        // Execute the query with the id_booth parameter
        const [rows]: any = await this.db.query(query, [id_booth]);
    
        return rows as RowDataPacket[]; // Cast the result to RowDataPacket[]
    }     
}



export default PemantauanBisnisService;
