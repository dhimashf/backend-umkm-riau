import { Request, Response } from 'express';
import BayarSewaService from '../services/bayarsewaService';
class bayarSewaController {
    private BayarSewaService = new BayarSewaService();

// Get all bukti bayar
    public async getAllBayarSewa(req: Request, res: Response): Promise<void> {
      try {
          const bayarSewa = await this.BayarSewaService.getAllBayarSewa();
          res.status(200).json({
              success: true,
              data: bayarSewa
          });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Gagal mengambil data bukti bayar.',
              error: (error as Error).message,
          });
      }
    }

    // Add bukti bayar
    public async addbayarSewa(req: Request, res: Response): Promise<void> {
        try {
            const { id_sewa, tanggal, jumlah } = req.body;
            const filePath = req.file?.path; // File path from Multer

            // Validate input
            if (!id_sewa || !tanggal || !jumlah) {
                res.status(400).json({
                    success: false,
                    message: 'Isi semua kolom (id_sewa, tanggal, jumlah).',
                });
                return;
            }

            if (!filePath) {
                res.status(400).json({
                    success: false,
                    message: 'File harus di upload',
                });
                return;
            }

            // Add bukti bayar using the service
            const isSuccess = await this.BayarSewaService.addBayarSewa(
                { id_sewa, tanggal, bukti: '', jumlah }, // `bukti` will be handled in the service
                filePath
            );

            if (isSuccess) {
                res.status(201).json({
                    success: true,
                    message: 'Bukti bayar berhasil ditambahkan',
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Gagal menambahkan bukti bayar.',
                });
            }
        } catch (error) {
            console.error('Error menambahkan bukti bayar:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error saat menambahkan bukti bayar.',
                error: (error as Error).message,
            });
        }
    }

    // Get bukti bayar by id_sewa
    public async getBayarSewaBysewaId(req: Request, res: Response): Promise<void> {
        const { id_sewa } = req.params;

        try {
            const bayarSewa = await this.BayarSewaService.getBayarSewaBysewaId(Number(id_sewa));
            if (bayarSewa.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'Tidak ada bukti bayar untuk id_sewa tersebut.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: bayarSewa,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil data bukti bayar.',
                error: (error as Error).message,
            });
        }
    }
    public async deleteBayarSewa(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            // Hapus dokumentasi menggunakan service
            const deleted = await this.BayarSewaService.deleteBayarSewa(id);

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
            console.error(`Error menghapus Bukti Bayar dengan ID ${id}:`, error);
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus Bukti Bayar.',
                error: (error as Error).message,
            });
        }
    }
    public async deleteBayarSewaByIdSewa(req: Request, res: Response): Promise<void> {
        const { id_sewa } = req.params;

        // Validate id_sewa
        if (!id_sewa || isNaN(Number(id_sewa))) {
            res.status(400).json({
                success: false,
                message: 'ID Sewa tidak valid.'
            });
            return;
        }

        try {
            const deleted = await this.BayarSewaService.deleteBayarSewaByIdSewa(Number(id_sewa));

            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Bukti Bayar tidak ditemukan.'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Bukti Bayar berhasil dipindahkan ke riwayat dan dihapus dari database.'
            });
        } catch (error) {
            console.error(`Error saat menghapus Bukti Bayar dengan ID ${id_sewa}:`, error);
            res.status(500).json({
                success: false,
                message: 'Gagal memproses Bukti Bayar.',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    
}

export default bayarSewaController;
