// src/controller/dokumentasiController.ts
import { Request, Response } from 'express';
import DokumentasiService from '../services/dokumentasiService';

class DokumentasiController {
    private dokumentasiService = new DokumentasiService();

    public async getDokumentasi(req: Request, res: Response): Promise<void> {
        try {
            const dokumentasi = await this.dokumentasiService.getAllDokumentasi();
            res.status(200).json({
                success: true,
                data: dokumentasi,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch data',
                error: (error as Error).message,
            });
        }
    }

    public async getDokumentasiByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const dokumentasi = await this.dokumentasiService.getDokumentasiByID(id);
            if (!dokumentasi) {
                res.status(404).json({
                    success: false,
                    message: 'Dokumentasi tidak ditemukan.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: dokumentasi,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil dokumentasi.',
                error: (error as Error).message,
            });
        }
    }

    public async addDokumentasi(req: Request, res: Response): Promise<void> {
        const { id, jenis, ukuran, harga, foto } = req.body;

        try {
            await this.dokumentasiService.createDokumentasi({ id, jenis, ukuran, harga, foto });
            res.status(201).json({
                success: true,
                message: 'Dokumentasi berhasil ditambahkan.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menambahkan dokumentasi.',
                error: (error as Error).message,
            });
        }
    }

    public async updateDokumentasi(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { jenis, ukuran, harga, foto } = req.body;

        try {
            const updated = await this.dokumentasiService.updateDokumentasi(id, { jenis, ukuran, harga, foto });
            if (!updated) {
                res.status(404).json({
                    success: false,
                    message: 'Dokumentasi tidak ditemukan.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Dokumentasi berhasil diperbarui.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal memperbarui dokumentasi.',
                error: (error as Error).message,
            });
        }
    }

    public async deleteDokumentasi(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const deleted = await this.dokumentasiService.deleteDokumentasi(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Dokumentasi tidak ditemukan.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Dokumentasi berhasil dihapus.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus dokumentasi.',
                error: (error as Error).message,
            });
        }
    }

    
}

export default DokumentasiController;