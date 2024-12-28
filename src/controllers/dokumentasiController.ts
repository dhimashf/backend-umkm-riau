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
                message: 'Data dokumentasi berhasil diambil.',
                data: dokumentasi,
            });
        } catch (error) {
            console.error('Error fetching dokumentasi:', error);
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil data dokumentasi.',
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
                message: 'Dokumentasi berhasil ditemukan.',
                data: dokumentasi,
            });
        } catch (error) {
            console.error(`gagal mengambil dokumentasi dengan ID ${id}:`, error);
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil dokumentasi.',
                error: (error as Error).message,
            });
        }
    }

    public async addDokumentasi(req: Request, res: Response): Promise<void> {
        try {
            const { jenis, ukuran, harga, deskripsi } = req.body;
            const fotoPath = req.file?.path; // Path file dari Multer
    
            // Validasi input
            if ( !jenis || !ukuran || !harga) {
                res.status(400).json({
                    success: false,
                    message: 'Semua field (jenis, ukuran, harga) harus diisi.',
                });
                return;
            }
    
            if (!fotoPath) {
                res.status(400).json({
                    success: false,
                    message: 'File foto harus diunggah.',
                });
                return;
            }
    
            // Tambah dokumentasi menggunakan service
            const isSuccess = await this.dokumentasiService.addDokumentasi(
                {  jenis, ukuran, harga, foto: '', deskripsi }, // `foto` akan diisi oleh service
                fotoPath
            );
    
            if (isSuccess) {
                res.status(201).json({
                    success: true,
                    message: 'Dokumentasi berhasil ditambahkan.',
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Gagal menambahkan dokumentasi.',
                });
            }
        } catch (error) {
            console.error('Gagal menabahkan dokumentasi:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error saat menambahkan dokumentasi.',
                error: (error as Error).message,
            });
        }
    }
    
    public async updateDokumentasi(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { jenis, ukuran, harga, deskripsi } = req.body;
        const fotoPath = req.file?.path; // Path file dari Multer jika ada
    
        try {
            // Panggil service untuk update
            const updated = await this.dokumentasiService.updateDokumentasi(
                id,
                { jenis, ukuran, harga, deskripsi },
                fotoPath // Tambahkan filePath opsional
            );
    
            if (!updated) {
                res.status(404).json({
                    success: false,
                    message: 'Dokumentasi tidak ditemukan atau tidak ada perubahan.',
                });
                return;
            }
    
            res.status(200).json({
                success: true,
                message: 'Dokumentasi berhasil diperbarui.',
            });
        } catch (error) {
            console.error(`Gagal memperbarui dokumentasi dengan ID ${id}:`, error);
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
            // Hapus dokumentasi menggunakan service
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
            console.error(`Gagal menghapus dokumentasi dengan ID ${id}:`, error);
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus dokumentasi.',
                error: (error as Error).message,
            });
        }
    }
}

export default DokumentasiController;
