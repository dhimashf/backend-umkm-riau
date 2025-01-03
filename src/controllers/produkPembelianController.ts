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
    public async getProdukByPembelian(req: Request, res: Response): Promise<void> {
        const { id_pembelian } = req.params;
    
        try {
            const { produk, totalTransaksi } = await this.produkPembelianService.getProdukByPembelian(Number(id_pembelian));
    
            res.status(200).json({
                success: true,
                data: produk,
                totalTransaksi,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil data produk pembelian.',
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
                message: 'Barang Cash berhasil ditambahkan.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menambahkan Barang cash.',
                error: (error as Error).message,
            });
        }
    }
    public async hapusProdukPembelian(req: Request, res: Response): Promise<void> {
        const { id_pembelian } = req.params;  // id_sewa masih tetap sebagai string
        try {
            const deleted = await this.produkPembelianService.hapusProdukPembelian(parseInt(id_pembelian));  // Menggunakan id_sewa sebagai string
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



export default ProdukPembelianController;
