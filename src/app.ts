import express from 'express';
import dotenv from 'dotenv';
import akunRoutes from './routes/AkunRoutes';
import dokumentasiRoutes from './routes/dokumentasiRoutes';
import boothRoutes from './routes/boothRoutes';
import biodataRoutes from './routes/biodataRoutes';

dotenv.config();

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware() {
        this.app.use(express.json());
    }

    private initializeRoutes() {
        // Define the root route inside the initializeRoutes method
        this.app.get('/', (req, res) => {
            res.json({ message: 'Welcome to the API!' });
        });

        // Include other routes, for example:
        this.app.use('/api/akun', akunRoutes);
        this.app.use('/api/dokumentasi', dokumentasiRoutes);
        this.app.use('/api/biodata', biodataRoutes );
        this.app.use('/api/booth', boothRoutes );
    }
}

export default new App().app;
