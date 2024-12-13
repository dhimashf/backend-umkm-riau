import Database from '../config/database';
import { RowDataPacket } from 'mysql2/promise'; // Import tipe data bawaan dari mysql2

interface Biodata {
    nik: string;
    nama: string;
    alamat: string;
    jenis_kelamin: string;
    alamat_domisili: string,
    foto_ktp: string,
    akun_id_akun: string
}
class biodataService {
    private db = Database.getInstance().getConnection();

    // Mendapatkan semua biodata
    public async CekListBiodata(): Promise<RowDataPacket[]> {
        const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM biodata');
        return rows;
    }

    // Mendapatkan biodata berdasarkan NIK
    public async CekBiodataByNik(nik: string): Promise<RowDataPacket | null> {
        const [result] = await this.db.query<RowDataPacket[]>(
            `SELECT * FROM biodata WHERE nik = ?`, 
            [nik]
        );
        return result.length > 0 ? result[0] : null;
    }

    public async addbiodata(biodata: Biodata):Promise<void> {
        const { nik,nama,alamat,jenis_kelamin,alamat_domisili,foto_ktp,akun_id_akun } = biodata;
        await this.db.query('INSERT INTO biodata (nik,nama,alamat,jenis_kelamin,alamat_domisili,foto_ktp,akun_id_akun) VALUES (?, ?, ?, ?, ?, ?, ?)', [nik,nama,alamat,jenis_kelamin,alamat_domisili,foto_ktp,akun_id_akun]);
    }

    public async updateBiodata(nik: string, biodata: Partial<Biodata>): Promise<boolean> {
        const { nama,alamat,jenis_kelamin,alamat_domisili,foto_ktp,akun_id_akun } = biodata;
        const [result]: any = await this.db.query('UPDATE biodata SET nama = ?, alamat = ?, jenis_kelamin = ?, alamat_domisili = ?, foto_ktp = ?, akun_id_akun = ? WHERE nik = ?', [nama,alamat,jenis_kelamin,alamat_domisili,foto_ktp,akun_id_akun,nik]);
        return result.affectedRows > 0;
    }
}

export default biodataService;
