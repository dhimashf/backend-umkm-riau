import { Router } from 'express';
import PemantauanBisnisController from '../controllers/pemantauanBisnisController';

const PemantauanBisnisRoutes = Router();
const controller = new PemantauanBisnisController();

PemantauanBisnisRoutes.get('/pendapatan', controller.getTotalPendapatanBulanIni.bind(controller));
PemantauanBisnisRoutes.get('/all/:id_booth', controller.getPenyewaanBiodataByBooth.bind(controller));


export default PemantauanBisnisRoutes;