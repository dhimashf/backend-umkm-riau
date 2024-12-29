import { Router } from 'express';
import KerusakanController from '../controllers/kerusakanController';

const kerusakanRoutes = Router();
const controller = new KerusakanController();

kerusakanRoutes.post('/', controller.addKerusakan.bind(controller));

// Route untuk mendapatkan semua kerusakan
kerusakanRoutes.get('/', controller.getAllKerusakan.bind(controller));

// Route untuk mendapatkan kerusakan berdasarkan ID booth
kerusakanRoutes.get('/:id_booth', controller.getKerusakanById.bind(controller));

// kerusakanRoutes.ts
kerusakanRoutes.delete('/:id', controller.deleteKerusakan.bind(controller));

export default kerusakanRoutes;
