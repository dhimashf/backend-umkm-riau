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
            // Validasi apakah filePath valid
            if (!filePath) {
                throw new Error('File path tidak valid.');
            }

            // Upload file ke Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(filePath, {
                folder: 'products',
            });

            // Gunakan URL penuh dari Cloudinary
            const fotoKTP = uploadResponse.secure_url; // Mengambil URL lengkap yang dihasilkan oleh Cloudinary
            const { nik, nama, alamat, jenis_kelamin, alamat_domisili, akun_id_akun } = biodata;

            // Simpan data ke database
            await this.db.query(
                'INSERT INTO biodata (nik, nama, alamat, jenis_kelamin, alamat_domisili, foto_ktp, akun_id_akun) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nik, nama, alamat, jenis_kelamin, alamat_domisili, fotoKTP, akun_id_akun]
            );
        } catch (error) {
            console.error('Error adding biodata:', error);
            throw error; // Lemparkan error agar ditangani di controller
        }
    }

       
    
    public async updateBiodata(
        nik: string,
        biodata: Partial<Biodata>,
    ): Promise<boolean> {
        try {
            const { nama, alamat, jenis_kelamin, alamat_domisili } = biodata;
    
            const [result]: any = await this.db.query(
                'UPDATE biodata SET nama = ?, alamat = ?, jenis_kelamin = ?, alamat_domisili = ? WHERE nik = ?',
                [nama, alamat, jenis_kelamin, alamat_domisili, nik]
            );
    
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating Biodata:', error);
            throw error;
        }
    }
}


export default biodataService;
