import { Router } from 'express';
import UserController from '../controllers/akunController';

const routes = Router();
const userController = new UserController();

routes.get('/', (req, res) => userController.getAkun(req, res));
routes.get('/:no_hp', (req, res) => userController.getAkunByPhone(req, res));

export default routes;
