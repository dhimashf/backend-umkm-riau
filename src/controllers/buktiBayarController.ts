import { Request, Response } from 'express';
import BuktiBayarService from '../services/buktiBayarService';

class BuktiBayarController {
    private buktiBayarService = new BuktiBayarService();

    // Get all bukti bayar
    public async getAllBuktiBayar(req: Request, res: Response): Promise<void> {
        try {
            const buktiBayar = await this.buktiBayarService.getAllBuktiBayar();
            res.status(200).json({
                success: true,
                data: buktiBayar,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch bukti bayar.',
                error: (error as Error).message,
            });
        }
    }

    // Add bukti bayar
    public async addBuktiBayar(req: Request, res: Response): Promise<void> {
        try {
            const { id_pembelian, tanggal, jumlah } = req.body;
            const filePath = req.file?.path; // File path from Multer

            // Validate input
            if (!id_pembelian || !tanggal || !jumlah) {
                res.status(400).json({
                    success: false,
                    message: 'All fields (id_pembelian, tanggal, jumlah) must be provided.',
                });
                return;
            }

            if (!filePath) {
                res.status(400).json({
                    success: false,
                    message: 'File must be uploaded.',
                });
                return;
            }

            // Add bukti bayar using the service
            const isSuccess = await this.buktiBayarService.addBuktiBayar(
                { id_pembelian, tanggal, bukti: '', jumlah }, // `bukti` will be handled in the service
                filePath
            );

            if (isSuccess) {
                res.status(201).json({
                    success: true,
                    message: 'Bukti bayar added successfully.',
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Failed to add bukti bayar.',
                });
            }
        } catch (error) {
            console.error('Error adding bukti bayar:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error while adding bukti bayar.',
                error: (error as Error).message,
            });
        }
    }

    // Get bukti bayar by id_pembelian
    public async getBuktiByPembelianId(req: Request, res: Response): Promise<void> {
        const { id_pembelian } = req.params;

        try {
            const buktiBayar = await this.buktiBayarService.getBuktiByPembelianId(Number(id_pembelian));
            if (buktiBayar.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'No bukti bayar found for the given id_pembelian.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: buktiBayar,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch bukti bayar.',
                error: (error as Error).message,
            });
        }
    }
    public async deleteBuktiBayar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            // Hapus dokumentasi menggunakan service
            const deleted = await this.buktiBayarService.deleteBuktiBayar(id);

            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Bukti Bayar tidak ditemukan.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Bukti Bayar berhasil dihapus.',
            });
        } catch (error) {
            console.error(`Error deleting Bukti Bayar with ID ${id}:`, error);
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus Bukti Bayar.',
                error: (error as Error).message,
            });
        }
    }
}

export default BuktiBayarController;
