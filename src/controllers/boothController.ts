import { Request, Response } from 'express';
import BoothService from '../services/boothService';

class BoothController {
    private boothService = new BoothService();

    public async ListBooth(req: Request, res: Response): Promise<void> {
        try {
            const booths = await this.boothService.CekListBooths();
            res.status(200).json({
                success: true,
                data: booths,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch data',
                error: (error as Error).message,
            });
        }
    }
    public async BoothReady(req: Request, res: Response): Promise<void> {
        try {
            const booths = await this.boothService.CekBoothReady();
            res.status(200).json({
                success: true,
                data: booths,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch data',
                error: (error as Error).message,
            });
        }
    }


    public async getBoothByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const booth = await this.boothService.getBoothByID(id);
            if (!booth) {
                res.status(404).json({
                    success: false,
                    message: 'Booth not found.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: booth,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch booth.',
                error: (error as Error).message,
            });
        }
    }

    public async addBooth(req: Request, res: Response): Promise<void> {
        const { id_booth, ukuran, status, harga_sewa } = req.body;

        try {
            await this.boothService.createBooth({ id_booth, ukuran, status, harga_sewa });
            res.status(201).json({
                success: true,
                message: 'Booth added successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to add booth.',
                error: (error as Error).message,
            });
        }
    }

    public async updateBooth(req: Request, res: Response): Promise<void> {
        const { id_booth } = req.params;
        const { ukuran, status, harga_sewa } = req.body;

        try {
            const updated = await this.boothService.updateBooth(id_booth, { ukuran, status, harga_sewa });
            if (!updated) {
                res.status(404).json({
                    success: false,
                    message: 'Booth not found.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Booth updated successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update booth.',
                error: (error as Error).message,
            });
        }
    }
    public async updateStatus(req: Request, res: Response): Promise<void> {
        const { id_booth } = req.params;
        const { status } = req.body;

        try {
            const updated = await this.boothService.updateBooth(id_booth, {status });
            if (!updated) {
                res.status(404).json({
                    success: false,
                    message: 'Booth not found.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Booth Status updated successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update Status booth.',
                error: (error as Error).message,
            });
        }
    }

    public async deleteBooth(req: Request, res: Response): Promise<void> {
        const { id_booth } = req.params;

        try {
            const deleted = await this.boothService.deleteBooth(id_booth);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Booth not found.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Booth deleted successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete booth.',
                error: (error as Error).message,
            });
        }
    }

    //kerusakan
    // Menambahkan kerusakan ke booth
    public async addKerusakan(req: Request, res: Response): Promise<void> {
        const { id_booth, tanggal_kerusakan, riwayat_kerusakan } = req.body;

        try {
            await this.boothService.addKerusakan(id_booth, tanggal_kerusakan, riwayat_kerusakan);
            res.status(201).json({
                success: true,
                message: 'Kerusakan added successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to add kerusakan.',
                error: (error as Error).message,
            });
        }
    }

    // Mendapatkan semua kerusakan
    public async getAllKerusakan(req: Request, res: Response): Promise<void> {
        try {
            const kerusakan = await this.boothService.getAllKerusakan();
            res.status(200).json({
                success: true,
                data: kerusakan,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch kerusakan.',
                error: (error as Error).message,
            });
        }
    }

    // Mendapatkan kerusakan berdasarkan ID booth
    public async getKerusakanById(req: Request, res: Response): Promise<void> {
        const { id_booth } = req.params;
        try {
            const kerusakan = await this.boothService.getKerusakanById(id_booth);
            if (!kerusakan) {
                res.status(404).json({
                    success: false,
                    message: 'Kerusakan not found.',
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
                message: 'Failed to fetch kerusakan.',
                error: (error as Error).message,
            });
        }
    }
    // BoothController.ts
public async deleteKerusakan(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const deleted = await this.boothService.deleteKerusakan(Number(id));
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

export default BoothController;