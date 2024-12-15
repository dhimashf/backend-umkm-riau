import { Router } from 'express';
import AkunController from '../controllers/akunController';

const routes = Router();
const akunController = new AkunController();

// Route for getting all accounts (Protected Route)
routes.get('/', (req, res) => akunController.getAkun(req, res));

// Route for getting an account by phone number (Protected Route)
routes.get('/:no_hp', (req, res) => akunController.getAkunByPhone(req, res));

// Route for user registration (No authentication needed)
routes.post('/register', (req, res) => akunController.register(req, res));

// Route for user login (No authentication needed)
routes.post('/login', (req, res) => akunController.login(req, res));

// Route for forgot password (No authentication needed)
routes.post('/forgot-password', (req, res) => akunController.forgotPassword(req, res));

export default routes;
