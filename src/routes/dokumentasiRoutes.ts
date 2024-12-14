import { Router } from 'express';
import DokumentasiController from '../controllers/dokumentasiController';
import { upload } from '../middlewares/uploadMiddleware'; // Middleware Multer khusus untuk Cloudinary

const dokumentasiRoutes = Router();
const controller = new DokumentasiController();

// Route definitions
dokumentasiRoutes.get('/', controller.getDokumentasi.bind(controller)); // Mendapatkan semua dokumentasi
dokumentasiRoutes.get('/:id', controller.getDokumentasiByID.bind(controller)); // Mendapatkan dokumentasi berdasarkan ID
dokumentasiRoutes.post('/', upload.single('foto'), controller.addDokumentasi.bind(controller)); // Menambahkan dokumentasi baru
dokumentasiRoutes.put('/:id', upload.single('foto'), controller.updateDokumentasi.bind(controller)); // Memperbarui dokumentasi
dokumentasiRoutes.delete('/:id', controller.deleteDokumentasi.bind(controller)); // Menghapus dokumentasi

export default dokumentasiRoutes;
