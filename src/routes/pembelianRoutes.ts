import { Router } from 'express';
import PembelianController from '../controllers/pembelianController';
import { upload } from '../middlewares/uploadMiddleware'; // Middleware Multer khusus untuk Cloudinary

const pembelianRoutes = Router();
const controller = new PembelianController();

pembelianRoutes.get('/', controller.getAllPembelian.bind(controller));
pembelianRoutes.get('/id/:id', controller.getPembelianById.bind(controller));
pembelianRoutes.get('/:jenis_pembayaran', controller.getPembelianByJenisPembayaran.bind(controller));
pembelianRoutes.post('/cash', controller.addPembelianCash.bind(controller));
pembelianRoutes.post('/cash', controller.addPembelianCash.bind(controller));
pembelianRoutes.post('/credit', upload.single('foto_ktp'), controller.addPembelianCredit.bind(controller));
pembelianRoutes.delete('/:id', controller.hapusPembelian.bind(controller));


export default pembelianRoutes;
