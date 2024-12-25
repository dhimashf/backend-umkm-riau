import { Router } from 'express';
import PenyewaanController from '../controllers/penyewaanController';

const penyewaanRoutes = Router();
const controller = new PenyewaanController();

penyewaanRoutes.get('/', controller.getAllPenyewaan.bind(controller));
penyewaanRoutes.get('/lokasi/', controller.getLokasiBooth.bind(controller));
penyewaanRoutes.get('/:biodata_nik', controller.getPenyewaanByNik.bind(controller));
penyewaanRoutes.post('/', controller.addPenyewaan.bind(controller));
penyewaanRoutes.put('/:biodata_nik', controller.updatePenyewaan.bind(controller));
penyewaanRoutes.put('/status/:id_sewa', controller.updateStatusPenyewaan.bind(controller));
penyewaanRoutes.delete('/:id_sewa', controller.hapusPenyewaan.bind(controller));

export default penyewaanRoutes;
