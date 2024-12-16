import { Router } from 'express';
import BiodataController from '../controllers/biodataController';
import { upload } from '../middlewares/uploadMiddleware';

const biodataRoutes = Router();
const controller = new BiodataController();

biodataRoutes.get('/', controller.ListBiodata.bind(controller));
biodataRoutes.get('/:akun_id_akun', controller.getBiodataByNik.bind(controller));
biodataRoutes.post('/', upload.single('foto_ktp'), controller.addBiodata.bind(controller));
biodataRoutes.put('/:nik', upload.single('foto_ktp'), controller.updateBiodata.bind(controller));

export default biodataRoutes;
