import { Router } from 'express';
import PemantauanBisnisController from '../controllers/pemantauanBisnisController';

const PemantauanBisnisRoutes = Router();
const controller = new PemantauanBisnisController();

PemantauanBisnisRoutes.get('/', controller.getTotalPendapatanBulanIni.bind(controller));


export default PemantauanBisnisRoutes;