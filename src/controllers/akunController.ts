// src/controller/akunController.ts
import { Request, Response } from 'express';
import AkunService from '../services/akunService';

class AkunController {
    private akunService = new AkunService();

    public async getAkun(req: Request, res: Response): Promise<void> {
        try {
            const accounts = await this.akunService.getAllAkun();
            res.status(200).json({
                success: true,
                data: accounts,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch data',
                error: (error as Error).message,
            });
        }
    }

    public async getAkunByPhone(req: Request, res: Response): Promise<void> {
        const { no_hp } = req.params;

        try {
            const account = await this.akunService.getAkunByPhone(no_hp);
            if (!account) {
                res.status(404).json({
                    success: false,
                    message: 'Akun tidak ditemukan.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: account,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil Akun.',
                error: (error as Error).message,
            });
        }
    }
}

export default AkunController;