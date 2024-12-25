import { Request, Response } from 'express';
import ProdukPembelianService from '../services/produkPembelianService';

class ProdukPembelianController {
    private produkPembelianService = new ProdukPembelianService();
    public async getAllProdukPembelian(req: Request, res: Response): Promise<void> {
        try {
            const produkPembelian = await this.produkPembelianService.getAllProdukPembelian();
            res.status(200).json({
                success: true,
                data: produkPembelian,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch produk pembelian data.',
                error: (error as Error).message,
            });
        }
    }

    public async addBarangCash(req: Request, res: Response): Promise<void> {
        const pembelian = req.body;

        try {
            await this.produkPembelianService.addBarangCash(pembelian);
            res.status(201).json({
                success: true,
                message: 'Barang Cash added successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to add Barang cash.',
                error: (error as Error).message,
            });
        }
    }
}



export default ProdukPembelianController;
