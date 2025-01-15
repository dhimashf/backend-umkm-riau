import { Router } from 'express';
import KerusakanController from '../controllers/kerusakanController';
import { upload } from '../middlewares/uploadMiddleware';

const kerusakanRoutes = Router();
const controller = new KerusakanController();

kerusakanRoutes.post('/', upload.single('bukti_kerusakan'), controller.addKerusakan.bind(controller)); // Menambahkan dokumentasi baru

// Route untuk mendapatkan semua kerusakan
kerusakanRoutes.get('/', controller.getAllKerusakan.bind(controller));

// Route untuk mendapatkan kerusakan berdasarkan ID booth
kerusakanRoutes.get('/:id_booth', controller.getKerusakanById.bind(controller));

// kerusakanRoutes.ts
kerusakanRoutes.delete('/:id', controller.deleteKerusakan.bind(controller));

export default kerusakanRoutes;
