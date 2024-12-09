import { Router } from 'express';
import ExampleController from '../controller/controller';

const router = Router();
const controller = new ExampleController();

router.get('/example', (req, res) => controller.getExampleData(req, res));

export default router;
