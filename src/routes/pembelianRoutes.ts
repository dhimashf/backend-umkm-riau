import { Router } from 'express';
import PembelianController from '../controllers/pembelianController';

const pembelianRoutes = Router();
const controller = new PembelianController();

pembelianRoutes.get('/', controller.getAllPembelian.bind(controller));
pembelianRoutes.get('/:jenis_pembayaran', controller.getPembelianByJenisPembayaran.bind(controller));
pembelianRoutes.post('/cash', controller.addPembelianCash.bind(controller));

export default pembelianRoutes;
