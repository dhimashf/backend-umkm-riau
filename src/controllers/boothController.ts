import { Request, Response } from 'express';
import BoothService from '../services/boothService';

class BoothController {
  private boothService = new BoothService();

  public async ListBooth(req: Request, res: Response): Promise<void> {
      try {
          const booths = await this.boothService.CekListBooths();
          res.status(200).json({
              success: true,
              data: booths,
          });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Failed to fetch data',
              error: (error as Error).message,
          });
      }
  }

  public async getBoothByID(req: Request, res: Response): Promise<void> {
      const { id } = req.params;
      try {
          const booth = await this.boothService.getBoothByID(id);
          if (!booth) {
              res.status(404).json({
                  success: false,
                  message: 'Booth not found.',
              });
              return;
          }

          res.status(200).json({
              success: true,
              data: booth,
          });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Failed to fetch booth.',
              error: (error as Error).message,
          });
      }
  }

  public async addBooth(req: Request, res: Response): Promise<void> {
      const { id_booth, ukuran, status, harga_sewa, riwayat_kerusakan } = req.body;

      try {
          await this.boothService.createBooth({ id_booth, ukuran, status, harga_sewa, riwayat_kerusakan });
          res.status(201).json({
              success: true,
              message: 'Booth added successfully.',
          });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Failed to add booth.',
              error: (error as Error).message,
          });
      }
  }

  public async updateBooth(req: Request, res: Response): Promise<void> {
      const { id_booth } = req.params;
      const { ukuran, status, harga_sewa, riwayat_kerusakan } = req.body;

      try {
          const updated = await this.boothService.updateBooth(id_booth, { ukuran, status, harga_sewa, riwayat_kerusakan });
          if (!updated) {
              res.status(404).json({
                  success: false,
                  message: 'Booth not found.',
              });
              return;
          }

          res.status(200).json({
              success: true,
              message: 'Booth updated successfully.',
          });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Failed to update booth.',
              error: (error as Error).message,
          });
      }
  }

  public async deleteBooth(req: Request, res: Response): Promise<void> {
      const { id_booth } = req.params;

      try {
          const deleted = await this.boothService.deleteBooth(id_booth);
          if (!deleted) {
              res.status(404).json({
                  success: false,
                  message: 'Booth not found.',
              });
              return;
          }

          res.status(200).json({
              success: true,
              message: 'Booth deleted successfully.',
          });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Failed to delete booth.',
              error: (error as Error).message,
          });
      }
  }
}

export default BoothController;