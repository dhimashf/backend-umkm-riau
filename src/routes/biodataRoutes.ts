import { Router } from 'express';
import BiodataController from '../controllers/biodataController';

const biodataRoutes = Router();
const controller = new BiodataController();

biodataRoutes.get('/', controller.ListBiodata.bind(controller));
biodataRoutes.get('/:akun_id_akun', controller.getBiodataByNik.bind(controller));
biodataRoutes.post('/', controller.addBiodata.bind(controller));
biodataRoutes.put('/:nik', controller.updateBiodata.bind(controller));

export default biodataRoutes;