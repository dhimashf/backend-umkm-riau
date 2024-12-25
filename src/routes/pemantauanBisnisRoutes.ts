import { Router } from 'express';
import PemantauanBisnisController from '../controllers/pemantauanBisnisController';

const PemantauanBisnisRoutes = Router();
const controller = new PemantauanBisnisController();

PemantauanBisnisRoutes.get('/pendapatan', controller.getTotalPendapatanBulanIni.bind(controller));
PemantauanBisnisRoutes.get('/all', controller.getPenyewaanBiodata.bind(controller));


export default PemantauanBisnisRoutes;