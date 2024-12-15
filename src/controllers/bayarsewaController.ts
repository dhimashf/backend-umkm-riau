import { Request, Response } from 'express';
import BayarSewaService from '../services/bayarsewaService';

class BayarSewaController {
  private bayarSewaService = new BayarSewaService();

  public async getAllBayarSewa(req: Request, res: Response): Promise<void> {
    try {
      const bayarSewa = await this.bayarSewaService.getAllBayarSewa();
      res.status(200).json({
        success: true,
        data: bayarSewa,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch data.',
        error: (error as Error).message,
      });
    }
  }

  public async getBayarSewaById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const bayarSewa = await this.bayarSewaService.getBayarSewaById(Number(id));
      if (!bayarSewa) {
        res.status(404).json({
          success: false,
          message: 'Bayar Sewa not found.',
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
        message: 'Failed to fetch data.',
        error: (error as Error).message,
      });
    }
  }

  public async addBayarSewa(req: Request, res: Response): Promise<void> {
    const { tanggal, bukti, jumlah, penyewaan_id_sewa, booth_id_booth, biodata_nik } = req.body;
    try {
      await this.bayarSewaService.addBayarSewa({ tanggal, bukti, jumlah, penyewaan_id_sewa, booth_id_booth, biodata_nik });
      res.status(201).json({
        success: true,
        message: 'Bayar Sewa added successfully.',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to add Bayar Sewa.',
        error: (error as Error).message,
      });
    }
  }

  public async updateBayarSewa(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { tanggal, bukti, jumlah, penyewaan_id_sewa, booth_id_booth, biodata_nik } = req.body;
    try {
      const updated = await this.bayarSewaService.updateBayarSewa(Number(id), { tanggal, bukti, jumlah, penyewaan_id_sewa, booth_id_booth, biodata_nik });
      if (!updated) {
        res.status(404).json({
          success: false,
          message: 'Bayar Sewa not found.',
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Bayar Sewa updated successfully.',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update Bayar Sewa.',
        error: (error as Error).message,
      });
    }
  }

  public async deleteBayarSewa(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deleted = await this.bayarSewaService.deleteBayarSewa(Number(id));
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Bayar Sewa not found.',
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Bayar Sewa deleted successfully.',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete Bayar Sewa.',
        error: (error as Error).message,
      });
    }
  }
}

export default BayarSewaController;
