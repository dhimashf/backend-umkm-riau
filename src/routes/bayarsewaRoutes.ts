import { Router } from 'express';
import BayarSewaController from '../controllers/bayarsewaController';  
import { upload } from '../middlewares/uploadMiddleware'; // Middleware Multer khusus untuk Cloudinary
import AuthMiddleware from '../middlewares/authMiddleware';

const bayarsewaRoutes = Router();
const controller = new BayarSewaController();
const auth = new AuthMiddleware();


bayarsewaRoutes.get('/', controller.getAllBayarSewa.bind(controller));
bayarsewaRoutes.get('/:id_sewa', controller.getBayarSewaBysewaId.bind(controller));
bayarsewaRoutes.post('/add', upload.single('bukti'), controller.addbayarSewa.bind(controller));
bayarsewaRoutes.delete('/:id', controller.deleteBayarSewa.bind(controller));

export default bayarsewaRoutes;