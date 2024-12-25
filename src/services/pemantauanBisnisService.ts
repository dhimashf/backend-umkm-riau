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
}

export default PemantauanBisnisService;
