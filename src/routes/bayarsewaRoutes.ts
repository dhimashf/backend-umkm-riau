import { Router } from 'express';
import BayarSewaController from '../controllers/bayarsewaController';

const bayarSewaRoutes = Router();
const controller = new BayarSewaController();

bayarSewaRoutes.get('/', controller.getAllBayarSewa.bind(controller));
bayarSewaRoutes.get('/:id', controller.getBayarSewaById.bind(controller));
bayarSewaRoutes.post('/', controller.addBayarSewa.bind(controller));
bayarSewaRoutes.put('/:id', controller.updateBayarSewa.bind(controller));
bayarSewaRoutes.delete('/:id', controller.deleteBayarSewa.bind(controller));

export default bayarSewaRoutes;
