import express from 'express';
import dotenv from 'dotenv';
import exampleRoutes from './routes/routes';

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
        this.app.use('/api', exampleRoutes);
    }
}

export default new App().app;
