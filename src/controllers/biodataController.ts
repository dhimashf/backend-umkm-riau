// src/controller/biodataController.ts
import { Request, Response } from 'express';
import BiodataService from '../services/biodataService';

class BiodataController {
    private biodataService = new BiodataService();

    // Endpoint untuk get semua biodata pelanggan (/api/biodata)
    public async ListBiodata(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.biodataService.CekListBiodata();
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch data',
                error: (error as Error).message,
            });
        }
    }

    // Endpoint untuk get biodata pelanggan berdasarkan NIK (/api/biodata/:nik)
    public async getBiodataByNik(req: Request, res: Response): Promise<void> {
        const { nik } = req.params;

        try {
            const biodata = await this.biodataService.CekBiodataByNik(nik);

            if (!biodata) {
                res.status(404).json({
                    success: false,
                    message: 'Biodata tidak ditemukan.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: biodata,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil Biodata.',
                error: (error as Error).message,
            });
        }
    }
}

export default BiodataController;
