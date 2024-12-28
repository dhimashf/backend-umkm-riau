import { Request, Response } from 'express';
import PenyewaanService from '../services/penyewaanService';

class PenyewaanController {
    private penyewaanService = new PenyewaanService();

    // Menambahkan penyewaan baru
    public async addPenyewaan(req: Request, res: Response): Promise<void> {
        const { id_sewa, mulai_sewa, akhir_sewa, lokasi, status, booth_id_booth, biodata_nik, durasi } = req.body;

        try {
            await this.penyewaanService.addPenyewaan({ id_sewa, mulai_sewa, akhir_sewa, lokasi, status, booth_id_booth, biodata_nik, durasi, permintaan_dibuat: new Date() });
            res.status(201).json({
                success: true,
                message: 'Permintaan Penyewaan Berhasil di Tambah.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal untuk menambahkan Permintaan Penyewaan.',
                error: (error as Error).message,
            });
        }
    }

    // Mendapatkan semua penyewaan
    public async getAllPenyewaan(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.penyewaanService.getAllPenyewaan();
            res.status(200).json({ 
                success: true, 
                data });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: 'Gagal mengambil data penyewaan.', 
                error: (error as Error).message });
        }
    }

    // Mendapatkan lokasi booth
    public async getLokasiBooth(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.penyewaanService.getLokasiBooth();
            res.status(200).json({ 
                success: true, 
                data });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: 'Gagal mengambil data Lokasi.', 
                error: (error as Error).message });
        }
    }

    // Mendapatkan penyewaan berdasarkan nik
    public async getPenyewaanByNik(req: Request, res: Response): Promise<void> {
        const { biodata_nik } = req.params;
        try {
            const penyewaan = await this.penyewaanService.getPenyewaanByNik(biodata_nik);

            if (!penyewaan) {
                res.status(404).json({
                    success: false,
                    message: 'Penyewaan tidak ditemukan.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: penyewaan,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil Penyewaan.',
                error: (error as Error).message,
            });
        }
    }

    // Update penyewaan
    public async updatePenyewaan(req: Request, res: Response): Promise<void> {
        const { biodata_nik } = req.params;
        const { mulai_sewa, akhir_sewa, status, booth_id_booth } = req.body;
        try {
            await this.penyewaanService.updatePenyewaan(biodata_nik, { mulai_sewa, akhir_sewa, status, booth_id_booth });
            res.status(201).json({
                success: true,
                message: 'Penyewaan berhasil diupdate.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal untuk mengupdate Penyewaan.',
                error: (error as Error).message,
            });
        }
    }

public async hapusPenyewaan(req: Request, res: Response): Promise<void> {
    const { id_sewa } = req.params;  // id_sewa masih tetap sebagai string
    try {
        const deleted = await this.penyewaanService.hapusPenyewaan(parseInt(id_sewa));  // Menggunakan id_sewa sebagai string
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Penyewaan tidak ditemukan.' });
            return;
        }

        res.status(200).json({ success: true, message: 'Penyewaan berhasil dihapus.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Gagal menghapus penyewaan.', error: (error as Error).message });
    }
}

public async updateStatusPenyewaan(req: Request, res: Response): Promise<void> {
    const { id_sewa } = req.params;  // id_sewa tetap sebagai string
    const { status } = req.body;

    // Parsing id_sewa menjadi number
    const idSewaNumber = parseInt(id_sewa);

    if (isNaN(idSewaNumber)) {
        res.status(400).json({
            success: false,
            message: 'id_sewa harus berupa angka.',
        });
        return;
    }

    try {
        const updated = await this.penyewaanService.updateStatusPenyewaan(idSewaNumber, status);

        if (!updated) {
            res.status(404).json({
                success: false,
                message: 'Penyewaan tidak ditemukan atau gagal diperbarui.',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Status penyewaan berhasil diperbarui.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui status penyewaan.',
            error: (error as Error).message,
        });
    }
}

}

export default PenyewaanController;
