import { Router } from 'express';
import boothController from '../controllers/boothController';

const boothRoutes = Router();
const controller = new boothController();

boothRoutes.get('/', controller.ListBooth.bind(controller));

export default boothRoutes;