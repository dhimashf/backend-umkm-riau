import { Router } from 'express';
import buktiPembayaranController from '../controllers/buktiBayarController';
import { upload } from '../middlewares/uploadMiddleware'; // Middleware Multer khusus untuk Cloudinary

const buktiPembayaranRoutes = Router();
const controller = new buktiPembayaranController();

buktiPembayaranRoutes.get('/', controller.getAllBuktiBayar.bind(controller));
buktiPembayaranRoutes.get('/:id_pembelian', controller.getBuktiByPembelianId.bind(controller));
buktiPembayaranRoutes.post('/', upload.single('bukti'), controller.addBuktiBayar.bind(controller));
buktiPembayaranRoutes.delete('/:id', controller.deleteBuktiBayar.bind(controller));
buktiPembayaranRoutes.delete('/idpembelian/:id_pembelian', controller.deleteBuktiBayarByIdPembelian.bind(controller));

export default buktiPembayaranRoutes;
