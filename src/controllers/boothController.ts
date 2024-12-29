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
                message: 'Gagal mengambil data',
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
                message: 'Gagal mengambil data',
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
                    message: 'Booth tidak ditemukan',
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
                message: 'Gagal mengambil booth.',
                error: (error as Error).message,
            });
        }
    }

    public async addBooth(req: Request, res: Response): Promise<void> {
        const { id_booth, ukuran, status } = req.body;

        try {
            await this.boothService.createBooth({ id_booth, ukuran, status });
            res.status(201).json({
                success: true,
                message: 'Booth berhasil ditambahkan.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menambahkan booth.',
                error: (error as Error).message,
            });
        }
    }

    
    public async updateStatus(req: Request, res: Response): Promise<void> {
        const { id_booth } = req.params;
        const { status } = req.body;

        try {
            const updated = await this.boothService.updateStatus(id_booth, status );
            if (!updated) {
                res.status(404).json({
                    success: false,
                    message: 'Booth tidak ditemukan',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Booth Status berhasil di Update',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal untuk update Status booth.',
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
                    message: 'Booth tidak ditemukan',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Booth berhasil dihapus',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal untuk menghapus booth.',
                error: (error as Error).message,
            });
        }
    }

    

}

export default BoothController;