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

    public async addPembelianCash(req: Request, res: Response): Promise<void> {
        const pembelian = req.body;

        try {
            await this.pembelianService.addPembelianCash(pembelian);
            res.status(201).json({
                success: true,
                message: 'Pembelian Cash added successfully.',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to add Pembelian cash.',
                error: (error as Error).message,
            });
        }
    }

    public async addPembelianCredit(req: Request, res: Response): Promise<void> {
    try {
        const { 
            tanggal_transaksi,
            jenis_pembayaran,
            nama,
            alamat,
            no_hp,
            jenis_kelamin,
            alamat_domisili,
            nik,
            tenor 
        } = req.body;

        const filePath = req.file?.path; // Path file dari Multer

        // Validasi input
        if (
            !tanggal_transaksi ||
            !jenis_pembayaran ||
            !nama ||
            !alamat ||
            !no_hp ||
            !jenis_kelamin ||
            !alamat_domisili ||
            !nik ||
            !tenor
        ) {
            res.status(400).json({
                success: false,
                message: 'Semua field harus diisi.',
            });
            return;
        }

        if (!filePath) {
            res.status(400).json({
                success: false,
                message: 'File foto harus diunggah.',
            });
            return;
        }

        // Tambahkan pembelian credit menggunakan service
        const isSuccess = await this.pembelianService.addPembelianCredit(
            {tanggal_transaksi,
                jenis_pembayaran,
                nama,
                alamat,
                no_hp,
                jenis_kelamin,
                alamat_domisili,
                nik,
                tenor,
                foto_ktp: '' // Akan diisi di service setelah upload ke Cloudinary
            },
            filePath
        );

        if (isSuccess) {
            res.status(201).json({
                success: true,
                message: 'Pembelian credit berhasil ditambahkan.',
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Gagal menambahkan pembelian credit.',
            });
        }
    } catch (error) {
        console.error('Error adding credit pembelian:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error saat menambahkan pembelian credit.',
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
