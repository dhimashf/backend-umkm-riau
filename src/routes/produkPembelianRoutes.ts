import { Router } from 'express';
import produkPembelianController from '../controllers/produkPembelianController';

const produkPembelianRoutes = Router();
const controller = new produkPembelianController();

produkPembelianRoutes.post('/', controller.addBarangCash.bind(controller));
produkPembelianRoutes.get('/', controller.getAllProdukPembelian.bind(controller));
produkPembelianRoutes.get('/:id_pembelian', controller.getProdukByPembelian.bind(controller));
produkPembelianRoutes.delete('/:id_pembelian', controller.hapusProdukPembelian.bind(controller));


export default produkPembelianRoutes;
