import Database from '../config/database';
import { RowDataPacket } from 'mysql2/promise'; // Import tipe data bawaan dari mysql2
import cloudinary from '../config/cloudinary';

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
    public async CekBiodataById(nik: string): Promise<RowDataPacket | null> {
        const [result] = await this.db.query<RowDataPacket[]>(
            `SELECT * FROM biodata WHERE akun_id_akun = ?`, 
            [nik]
        );
        return result.length > 0 ? result[0] : null;
    }

    public async addBiodata(biodata: Biodata, filePath: string): Promise<void> {
        try {
            const uploadResponse = await cloudinary.uploader.upload(filePath, { folder: 'products' });
            const fotoKtpPublicId = uploadResponse.public_id;

            const { nik, nama, alamat, jenis_kelamin, alamat_domisili, akun_id_akun } = biodata;
            await this.db.query(
                'INSERT INTO biodata (nik, nama, alamat, jenis_kelamin, alamat_domisili, foto_ktp, akun_id_akun) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nik, nama, alamat, jenis_kelamin, alamat_domisili, fotoKtpPublicId, akun_id_akun]
            );
        } catch (error) {
            console.error('Error uploading KTP:', error);
            throw error;
        }
    }

    public async updateBiodata(
        nik: string,
        biodata: Partial<Biodata>,
        filePath?: string
    ): Promise<boolean> {
        try {
            let fotoKtpPublicId = biodata.foto_ktp;

            if (filePath) {
                // Jika ada file baru, unggah ke Cloudinary
                const uploadResponse = await cloudinary.uploader.upload(filePath, { folder: 'products' });
                fotoKtpPublicId = uploadResponse.public_id;
            }

            const { nama, alamat, jenis_kelamin, alamat_domisili, akun_id_akun } = biodata;
            const [result]: any = await this.db.query(
                'UPDATE biodata SET nama = ?, alamat = ?, jenis_kelamin = ?, alamat_domisili = ?, foto_ktp = ?, akun_id_akun = ? WHERE nik = ?',
                [nama, alamat, jenis_kelamin, alamat_domisili, fotoKtpPublicId, akun_id_akun, nik]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating biodata:', error);
            throw error;
        }
    }
}


export default biodataService;
