import { Router } from 'express';
import produkPembelianController from '../controllers/produkPembelianController';

const produkPembelianRoutes = Router();
const controller = new produkPembelianController();

produkPembelianRoutes.post('/', controller.addBarangCash.bind(controller));
produkPembelianRoutes.get('/', controller.getAllProdukPembelian.bind(controller));


export default produkPembelianRoutes;
