import { Router } from 'express';
import BiodataController from '../controllers/biodataController';
import { upload } from '../middlewares/uploadMiddleware';

const biodataRoutes = Router();
const controller = new BiodataController();

biodataRoutes.get('/', controller.GetAllBiodata.bind(controller));
biodataRoutes.get('/:akun_id_akun', controller.getBiodataById.bind(controller));
biodataRoutes.get('/nik/:nik', controller.getBiodataByNik.bind(controller));
biodataRoutes.post('/', upload.single('foto_ktp'), controller.addBiodata.bind(controller));
biodataRoutes.put('/:nik', upload.single('foto_ktp'), controller.updateBiodata.bind(controller));

export default biodataRoutes;
