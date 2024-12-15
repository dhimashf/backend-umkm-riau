import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import akunRoutes from './routes/akunRoutes';
import dokumentasiRoutes from './routes/dokumentasiRoutes';
import boothRoutes from './routes/boothRoutes';
import biodataRoutes from './routes/biodataRoutes';
import pembelianRoutes from './routes/pembelianRoutes';
import penyewaanRoutes from './routes/penyewaanRoutes';
import kreditRoutes from './routes/kreditRoutes';

dotenv.config();

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware() {
        // Tambahkan Helmet untuk keamanan
        this.app.use(helmet());

        // Konfigurasi CORS
        this.app.use(
            cors({
                origin: ['http://localhost:3000','http://192.168.1.30:3000'],
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization'],
            })
        );

        // Middleware untuk parsing JSON
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
        this.app.use('/api/biodata', biodataRoutes);
        this.app.use('/api/booth', boothRoutes);
        this.app.use('/api/pembelian', pembelianRoutes);
        this.app.use('/api/penyewaan', penyewaanRoutes);
        this.app.use('/api/kredit', kreditRoutes);
    }
}

export default new App().app;
