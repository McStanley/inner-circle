import { Router } from 'express';
import * as indexController from '../controllers/index';

const router = Router();

router.get('/', indexController.index_GET);

export default router;
