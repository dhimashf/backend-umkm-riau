import { Request, Response } from 'express';
import ExampleService from '../services/services';

class ExampleController {
    private service: ExampleService;

    constructor() {
        this.service = new ExampleService();
    }

    public async getExampleData(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.service.calculate();
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch data',
                error,
            });
        }
    }
}

export default ExampleController;
