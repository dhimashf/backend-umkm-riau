import { Router } from 'express';
import BoothController from '../controllers/boothController';

const boothRoutes = Router();
const controller = new BoothController();

// Route untuk mendapatkan semua booth
boothRoutes.get('/', controller.ListBooth.bind(controller));

// Route untuk mendapatkan booth yang siap disewa
boothRoutes.get('/ready/', controller.BoothReady.bind(controller));

// Route untuk mendapatkan booth berdasarkan ID
boothRoutes.get('/:id', controller.getBoothByID.bind(controller));

// Route untuk menambahkan booth
boothRoutes.post('/', controller.addBooth.bind(controller));

// Route untuk memperbarui booth berdasarkan ID

boothRoutes.put('/status/:id_booth', controller.updateStatus.bind(controller));

// Route untuk menghapus booth berdasarkan ID
boothRoutes.delete('/:id_booth', controller.deleteBooth.bind(controller));


export default boothRoutes;
