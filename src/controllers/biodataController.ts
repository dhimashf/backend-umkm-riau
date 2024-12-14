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
    public async addBiodata(req: Request, res: Response): Promise<void> {
      const { nik,nama,alamat,jenis_kelamin,alamat_domisili,foto_ktp,akun_id_akun } = req.body;

      try {
          await this.biodataService.addbiodata({nik,nama,alamat,jenis_kelamin,alamat_domisili,foto_ktp,akun_id_akun });
          res.status(201).json({
              success: true,
              message: 'Biodata berhasil ditambahkan.',
          });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Gagal menambahkan Biodata.',
              error: (error as Error).message,
          });
      }
  }
    public async updateBiodata(req: Request, res: Response): Promise<void> {
      const { nik } = req.params;  // Extract NIK from URL params
      const {nama,alamat,jenis_kelamin,alamat_domisili,foto_ktp,akun_id_akun} = req.body;  // Extract biodata from the request body

      try {
        const updated = await this.biodataService.updateBiodata(nik, { nama,alamat,jenis_kelamin,alamat_domisili,foto_ktp,akun_id_akun});
        if (!updated) {
            res.status(404).json({
                success: false,
                message: 'Biodata tidak ditemukan.',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Biodata berhasil diperbarui.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui Biodata.',
            error: (error as Error).message,
        });
    }
  }
}

export default BiodataController;