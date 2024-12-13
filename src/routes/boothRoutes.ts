import { Router } from 'express';
import boothController from '../controllers/boothController';

const boothRoutes = Router();
const controller = new boothController();

boothRoutes.get('/', controller.ListBooth.bind(controller));
boothRoutes.get('/:id', controller.getBoothByID.bind(controller));
boothRoutes.post('/', controller.addBooth.bind(controller));
boothRoutes.put('/:id_booth', controller.updateBooth.bind(controller));
boothRoutes.delete('/:id_booth', controller.deleteBooth.bind(controller));

export default boothRoutes;