import { Router } from 'express';
import BayarSewaController from '../controllers/bayarSewaController';  
import { upload } from '../middlewares/uploadMiddleware'; // Middleware Multer khusus untuk Cloudinary

const bayarSewaRoutes = Router();
const controller = new BayarSewaController();

bayarSewaRoutes.get('/', controller.getAllBayarSewa.bind(controller));
bayarSewaRoutes.get('/:id_sewa', controller.getBayarSewaBysewaId.bind(controller));
bayarSewaRoutes.post('/add', upload.single('bukti'), controller.addbayarSewa.bind(controller));
bayarSewaRoutes.delete('/:id', controller.deleteBayarSewa.bind(controller));
export default bayarSewaRoutes;
