    import { Router } from 'express';
    import AkunController from '../controllers/akunController';
    import AuthMiddleware from '../middlewares/authMiddleware';

    const akunRoutes = Router();
    const controller = new AkunController();
    const auth = new AuthMiddleware();

    akunRoutes.get('/',auth.verifyToken,auth.checkRole('KEPALA DIVISI'),controller.getAkun.bind(controller)); 
    akunRoutes.get('/:no_hp',controller.getAkunByPhone.bind(controller)); 
    akunRoutes.get('/id/:id_akun',controller.getAkunById.bind(controller)); 
    akunRoutes.post('/register', controller.register.bind(controller));
    akunRoutes.post('/login', controller.login.bind(controller));
    akunRoutes.put('/lupa-password', controller.forgotPassword.bind(controller));




    export default akunRoutes;
