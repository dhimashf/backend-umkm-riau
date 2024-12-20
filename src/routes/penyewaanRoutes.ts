import { Router } from 'express';
import PenyewaanController from '../controllers/penyewaanController';

const penyewaanRoutes = Router();
const controller = new PenyewaanController();

penyewaanRoutes.get('/', controller.getAllPenyewaan.bind(controller));
penyewaanRoutes.get('/:biodata_nik', controller.getPenyewaanByNik.bind(controller));
penyewaanRoutes.post('/', controller.addPenyewaan.bind(controller));
penyewaanRoutes.put('/:id_sewa', controller.updatePenyewaan.bind(controller));
penyewaanRoutes.delete('/:id_sewa', controller.hapusPenyewaan.bind(controller));

export default penyewaanRoutes;
