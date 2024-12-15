import { Request, Response } from 'express';
import PembelianService from '../services/pembelianServices';

class PembelianController {
    private pembelianService = new PembelianService();

    public async getAllPembelian(req: Request, res: Response): Promise<void> {
        try {
            const pembelians = await this.pembelianService.getAllPembelian();
            res.status(200).json({
                success: true,
                data: pembelians,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch pembelian data.',
                error: (error as Error).message,
            });
        }
    }

    public async addPembelian(req: Request, res: Response): Promise<void> {
        const pembelian = req.body;

        try {
            await this.pembelianService.addPembelian(pembelian);
            res.status(201).json({
                success: true,
                message: 'Pembelian added successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to add pembelian.',
                error: (error as Error).message,
            });
        }
    }

    public async updatePembelian(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const pembelian = req.body;

        try {
            const updated = await this.pembelianService.updatePembelian(id, pembelian);
            if (!updated) {
                res.status(404).json({
                    success: false,
                    message: 'Pembelian not found.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Pembelian updated successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update pembelian.',
                error: (error as Error).message,
            });
        }
    }

    public async getPembelianByJenisPembayaran(req: Request, res: Response): Promise<void> {
        const { jenis_pembayaran } = req.params;
    
        if (!['CASH', 'CREDIT'].includes(jenis_pembayaran)) {
            res.status(400).json({
                success: false,
                message: 'Jenis pembayaran tidak valid. Gunakan "CASH" atau "CREDIT".',
            });
            return;
        }
    
        try {
            const pembelians = await this.pembelianService.getPembelianByJenisPembayaran(jenis_pembayaran as 'CASH' | 'CREDIT');
            res.status(200).json({
                success: true,
                data: pembelians,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch pembelian data by jenis pembayaran.',
                error: (error as Error).message,
            });
        }
    }
    
}

export default PembelianController;
