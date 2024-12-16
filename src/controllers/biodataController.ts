// src/controller/biodataController.ts
import { Request, Response } from 'express';
import BiodataService from '../services/biodataService';

class BiodataController {
    private biodataService = new BiodataService();

    // Endpoint untuk get semua biodata pelanggan (/api/biodata)
    public async ListBiodata(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.biodataService.CekListBiodata();
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch data',
                error: (error as Error).message,
            });
        }
    }

    // Endpoint untuk get biodata pelanggan berdasarkan NIK (/api/biodata/:nik)
    public async getBiodataByNik(req: Request, res: Response): Promise<void> {
        const { akun_id_akun } = req.params;

        try {
            const biodata = await this.biodataService.CekBiodataById(akun_id_akun);

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
        const filePath = req.file?.path; // Dapatkan path file dari multer

        if (!filePath) {
            res.status(400).json({ success: false, message: 'Foto KTP harus diunggah.' });
            return;
        }

        try {
            await this.biodataService.addBiodata(
                { nik, nama, alamat, jenis_kelamin, alamat_domisili, foto_ktp: '', akun_id_akun },
                filePath
            );

            res.status(201).json({ success: true, message: 'Biodata berhasil ditambahkan.' });
        } catch (error) {
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
        const filePath = req.file?.path; // Dapatkan path file dari multer jika ada

        try {
            const updated = await this.biodataService.updateBiodata(
                nik,
                { nama, alamat, jenis_kelamin, alamat_domisili, foto_ktp: '', akun_id_akun },
                filePath
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
}

export default BiodataController;
