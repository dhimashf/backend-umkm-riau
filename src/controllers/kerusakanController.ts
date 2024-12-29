import { Request, Response } from 'express';
import KerusakanService from '../services/kerusakanServices';
class KerusakanController {
    private kerusakanService = new KerusakanService();

public async addKerusakan(req: Request, res: Response): Promise<void> {
        const { id_booth, tanggal_kerusakan, riwayat_kerusakan } = req.body;

        try {
            await this.kerusakanService.addKerusakan(id_booth, tanggal_kerusakan, riwayat_kerusakan);
            res.status(201).json({
                success: true,
                message: 'Kerusakan berhasil ditambahkan.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menambahkan kerusakan.',
                error: (error as Error).message,
            });
        }
    }

    // Mendapatkan semua kerusakan
    public async getAllKerusakan(req: Request, res: Response): Promise<void> {
        try {
            const kerusakan = await this.kerusakanService.getAllKerusakan();
            res.status(200).json({
                success: true,
                data: kerusakan,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil kerusakan.',
                error: (error as Error).message,
            });
        }
    }

    // Mendapatkan kerusakan berdasarkan ID booth
    public async getKerusakanById(req: Request, res: Response): Promise<void> {
        const { id_booth } = req.params;
        try {
            const kerusakan = await this.kerusakanService.getKerusakanById(id_booth);
            if (!kerusakan) {
                res.status(404).json({
                    success: false,
                    message: 'Kerusakan tidak ditemukan',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: kerusakan,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil kerusakan.',
                error: (error as Error).message,
            });
        }
    }
    // BoothController.ts
public async deleteKerusakan(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const deleted = await this.kerusakanService.deleteKerusakan(Number(id));
        if (!deleted) {
            res.status(404).json({
                success: false,
                message: 'Kerusakan tidak ditemukan.',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Kerusakan berhasil dihapus.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus kerusakan.',
            error: (error as Error).message,
        });
    }
}
}

export default KerusakanController;
