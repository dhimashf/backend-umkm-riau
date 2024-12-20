import { Router } from 'express';
import KreditController from '../controllers/kreditController';
const kreditRoutes = Router();
const controller = new KreditController();

kreditRoutes.get('/', controller.ListPembayaran.bind(controller));
kreditRoutes.get('/:id', controller.getPembayaranById.bind(controller));
kreditRoutes.post('/', controller.addPembayaran.bind(controller));
kreditRoutes.put('/:id', controller.updateRiwayatPembayaran.bind(controller));
kreditRoutes.delete('/:id', controller.deleteRiwayatPembayaran.bind(controller));

export default kreditRoutes;