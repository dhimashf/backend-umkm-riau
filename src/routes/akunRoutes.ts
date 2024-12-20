import { Router } from 'express';
import AkunController from '../controllers/akunController';
// import AuthMiddleware from '../middlewares/authMiddleware';

const akunRoutes = Router();
const controller = new AkunController();

akunRoutes.get('/',controller.getAkun.bind(controller)); 
akunRoutes.get('/:no_hp',controller.getAkunByPhone.bind(controller)); 
akunRoutes.post('/register', controller.register.bind(controller));
akunRoutes.post('/login', controller.login.bind(controller));
akunRoutes.put('/lupa-password', controller.forgotPassword.bind(controller));

export default akunRoutes;
