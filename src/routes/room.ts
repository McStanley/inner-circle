import { Router } from 'express';
import * as roomController from '../controllers/room';

const router = Router();

router.get('/', roomController.room_GET);

export default router;
