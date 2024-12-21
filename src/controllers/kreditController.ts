import { Request, Response } from 'express';
import KreditService from '../services/kreditService';

class KreditController {
    private kreditService = new KreditService();

    public async ListPembayaran(req: Request, res: Response): Promise<void> {
        try {
            const kredits = await this.kreditService.CekRiwayatPembayaran();
            res.status(200).json({
                success: true,
                data: kredits,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch data',
                error: (error as Error).message,
            });
        }
    }


    public async getPembayaranById(req: Request, res: Response): Promise<void> {
        const {id } = req.params;
        try {
            const kredit = await this.kreditService.getRiwayatPembayaranByID(Number(id));
            if (!kredit) {
                res.status(404).json({
                    success: false,
                    message: 'Riwayat Pembayaran not found.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: kredit,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch Riwayat Pembayaran.',
                error: (error as Error).message,
            });
        }
    }

    public async addPembayaran(req: Request, res: Response): Promise<void> {
        const { tanggal, bukti, jumlah, pembelian_id } = req.body;

        try {
            await this.kreditService.addRiwayatPembayaran({ tanggal, bukti, jumlah, pembelian_id });
            res.status(201).json({
                success: true,
                message: 'Riwayat Pembayaran added successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to add Riwayat Pembayaran.',
                error: (error as Error).message,
            });
        }
    }

    public async updateRiwayatPembayaran(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { tanggal, bukti, jumlah, pembelian_id } = req.body;

        try {
            const updated = await this.kreditService.updateRiwayatPembayaran(id, { tanggal, bukti, jumlah, pembelian_id }); 
            if (!updated) {
                res.status(404).json({
                    success: false,
                    message: 'Riwayat Pembayaran not found.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Riwayat Pembayaran updated successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update Riwayat Pembayaran.',
                error: (error as Error).message,
            });
        }
    }

    public async deleteRiwayatPembayaran(   req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const deleted = await this.kreditService.deleteRiwayatPembayaran(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Riwayat Pembayaran not found.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Riwayat pembayaran deleted successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete Riwayat Pembayaran.',
                error: (error as Error).message,
            });
        }
    }
}

export default KreditController;