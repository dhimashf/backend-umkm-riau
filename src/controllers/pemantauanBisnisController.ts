import { Request, Response } from 'express';
import PemantauanBisnisService from '../services/pemantauanBisnisService'; // Make sure the path is correct

class PemantauanBisnisController {
    private pemantauanBisnisService: PemantauanBisnisService;

    constructor() {
        this.pemantauanBisnisService = new PemantauanBisnisService();
    }

    public async getTotalPendapatanBulanIni(req: Request, res: Response): Promise<void> {
        try {
            const totalPendapatan = await this.pemantauanBisnisService.getTotalPendapatanBulanIni();
            res.status(200).json({
                success: true,
                totalPendapatan,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mendapatkan total pendapatan.',
                error: (error as Error).message,
            });
        }
    }
    public async getPenyewaanBiodataByBooth(req: Request, res: Response): Promise<void> {
        const { id_booth } = req.params; // Mengambil id_booth dari parameter request

        try {
            const data = await this.pemantauanBisnisService.getPenyewaanBiodataByBooth(id_booth);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mendapatkan penyewaan data berdasarkan booth.',
                error: (error as Error).message,
            });
        }
    }
}

export default PemantauanBisnisController;
