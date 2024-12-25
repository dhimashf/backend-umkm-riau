import { Router } from 'express';
import BayarSewaController from '../controllers/bayarSewaController';  
import { upload } from '../middlewares/uploadMiddleware'; // Middleware Multer khusus untuk Cloudinary

const bayarsewaRoutes = Router();
const controller = new BayarSewaController();

bayarsewaRoutes.get('/', controller.getAllBayarSewa.bind(controller));
bayarsewaRoutes.get('/:id_sewa', controller.getBayarSewaBysewaId.bind(controller));
bayarsewaRoutes.post('/add', upload.single('bukti'), controller.addbayarSewa.bind(controller));
bayarsewaRoutes.delete('/:id', controller.deleteBayarSewa.bind(controller));

export default bayarsewaRoutes;