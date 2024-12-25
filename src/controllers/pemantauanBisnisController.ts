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
                message: 'Failed to fetch total pendapatan.',
                error: (error as Error).message,
            });
        }
    }
}

export default PemantauanBisnisController;
