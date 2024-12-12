import { Router } from 'express';
import BiodataController from '../controllers/biodataController';

const biodataRoutes = Router();
const controller = new BiodataController();

biodataRoutes.get('/', controller.ListBiodata.bind(controller));
biodataRoutes.get('/:nik', controller.getBiodataByNik.bind(controller));

export default biodataRoutes;