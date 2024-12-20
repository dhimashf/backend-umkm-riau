
// penyewaanController.ts
import { Request, Response } from 'express';
import PenyewaanService from '../services/penyewaanService';

class PenyewaanController {
    private penyewaanService = new PenyewaanService();

    public async addPenyewaan(req: Request, res: Response): Promise<void> {
        const { id_sewa, mulai_sewa, akhir_sewa, lokasi, status, booth_id_booth, biodata_nik, durasi } = req.body;
    
        try {
            await this.penyewaanService.addPenyewaan({ id_sewa,mulai_sewa, akhir_sewa, lokasi, status, booth_id_booth, biodata_nik, durasi });
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

    public async getAllPenyewaan(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.penyewaanService.getAllPenyewaan();
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Gagal mengambil data penyewaan.', error: (error as Error).message });
        }
    }
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

    public async updatePenyewaan(req: Request, res: Response): Promise<void> {
        const { id_sewa } = req.params;
        const penyewaan = req.body;
        try {
            await this.penyewaanService.updatePenyewaan(id_sewa, penyewaan);
            res.status(201).json({
                success: true,
                message: 'Penyewaan Update successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to Update Penyewaan.',
                error: (error as Error).message,
            });
        }
    }


    public async hapusPenyewaan(req: Request, res: Response): Promise<void> {
        const { id_sewa } = req.params;
        try {
            const deleted = await this.penyewaanService.hapusPenyewaan(id_sewa);
            if (!deleted) {
                res.status(404).json({ success: false, message: 'Penyewaan tidak ditemukan.' });
                return;
            }

            res.status(200).json({ success: true, message: 'Penyewaan berhasil dihapus.' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Gagal menghapus penyewaan.', error: (error as Error).message });
        }
    }
    
}

export default PenyewaanController;