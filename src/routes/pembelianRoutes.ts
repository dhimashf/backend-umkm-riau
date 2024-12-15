import { Router } from 'express';
import PembelianController from '../controllers/pembelianController';

const pembelianRoutes = Router();
const controller = new PembelianController();

pembelianRoutes.get('/', controller.getAllPembelian.bind(controller));
pembelianRoutes.get('/:jenis_pembayaran', controller.getPembelianByJenisPembayaran.bind(controller));
pembelianRoutes.post('/', controller.addPembelian.bind(controller));
pembelianRoutes.put('/:id', controller.updatePembelian.bind(controller));

export default pembelianRoutes;
