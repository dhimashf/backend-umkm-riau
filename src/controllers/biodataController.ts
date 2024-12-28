// src/controller/biodataController.ts
import { Request, Response } from 'express';
import BiodataService from '../services/biodataService';

class BiodataController {
    private biodataService = new BiodataService();

    // Endpoint untuk get semua biodata pelanggan (/api/biodata)
   public async GetAllBiodata(req: Request, res: Response): Promise<void> {
    try {
        const user = (req as any).user; // Ambil data user dari middleware
        console.log('User Data from Token:', user);

        const data = await this.biodataService.GetAllBiodata();
        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        console.error('Error in GetAllBiodata:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data',
            error: (error as Error).message,
        });
    }
}

    // Endpoint untuk get biodata pelanggan berdasarkan NIK (/api/biodata/:nik)
    public async getBiodataById(req: Request, res: Response): Promise<void> {
        const { akun_id_akun } = req.params;

        try {
            const biodata = await this.biodataService.GetBiodataById(parseInt(akun_id_akun));
            if (!biodata) {
                res.status(404).json({
                    success: false,
                    message: 'Biodata tidak ditemukan.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: biodata,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil Biodata.',
                error: (error as Error).message,
            });
        }
    }
    public async getBiodataByNik(req: Request, res: Response): Promise<void> {
        const { nik } = req.params;

        try {
            const biodata = await this.biodataService.GetBiodataByNik(nik);

            if (!biodata) {
                res.status(404).json({
                    success: false,
                    message: 'Biodata tidak ditemukan.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: biodata,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil Biodata.',
                error: (error as Error).message,
            });
        }
    }
    public async addBiodata(req: Request, res: Response): Promise<void> {
        const { nik, nama, alamat, jenis_kelamin, alamat_domisili, akun_id_akun } = req.body;
        const filePath = req.file?.path; // Dapatkan path file dari Multer
    
        if (!filePath) {
            res.status(400).json({ success: false, message: 'Foto KTP harus diunggah.' });
            return;
        }
    
        try {
            // Panggil service untuk menambahkan biodata
            await this.biodataService.addBiodata(
                { nik, nama, alamat, jenis_kelamin, alamat_domisili, foto_ktp: '', akun_id_akun },
                filePath
            );
    
            res.status(201).json({ success: true, message: 'Biodata berhasil ditambahkan.' });
        } catch (error) {
            console.error('Error pada addBiodata:', error);
    
            res.status(500).json({
                success: false,
                message: 'Gagal menambahkan Biodata.',
                error: (error as Error).message,
            });
        }
    }
    

    public async updateBiodata(req: Request, res: Response): Promise<void> {
        const { nik } = req.params;
        const { nama, alamat, jenis_kelamin, alamat_domisili, akun_id_akun } = req.body;

        try {
            const updated = await this.biodataService.updateBiodata(
                nik,
                { nama, alamat, jenis_kelamin, alamat_domisili, foto_ktp: '', akun_id_akun }
            );

            if (!updated) {
                res.status(404).json({ success: false, message: 'Biodata tidak ditemukan.' });
                return;
            }

            res.status(200).json({ success: true, message: 'Biodata berhasil diperbarui.' });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal memperbarui Biodata.',
                error: (error as Error).message,
            });
        }
    }
    public async deleteBiodata(req: Request, res: Response): Promise<void> {
        const { akun_id_akun } = req.params; // Mengambil id_akun dari parameter URL
    
        try {
            // Validasi apakah id_akun ada dan merupakan angka
            if (isNaN(Number(akun_id_akun))) {
                res.status(400).json({
                    success: false,
                    message: 'ID akun tidak valid.',
                });
                return;
            }
    
            // Panggil service untuk menghapus biodata berdasarkan id_akun
            const deleted = await this.biodataService.deleteBiodata(Number(akun_id_akun));
    
            // Jika tidak ada biodata yang dihapus
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Biodata tidak ditemukan.',
                });
                return;
            }
    
            // Jika berhasil dihapus
            res.status(200).json({
                success: true,
                message: 'Biodata berhasil dihapus.',
            });
        } catch (error) {
            // Menangani error umum
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus biodata.',
                error: (error as Error).message,
            });
        }
    
}
}

export default BiodataController;
