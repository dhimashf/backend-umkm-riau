import { Router } from 'express';
import DokumentasiController from '../controllers/dokumentasiController';

const dokumentasiRoutes = Router();
const controller = new DokumentasiController();

// Route definitions

dokumentasiRoutes.get('/', controller.getDokumentasi.bind(controller));
dokumentasiRoutes.get('/:id', controller.getDokumentasiByID.bind(controller));
dokumentasiRoutes.post('/', controller.addDokumentasi.bind(controller));
dokumentasiRoutes.put('/:id', controller.updateDokumentasi.bind(controller));
dokumentasiRoutes.delete('/:id', controller.deleteDokumentasi.bind(controller));

export default dokumentasiRoutes;