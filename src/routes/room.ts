import { Router } from 'express';
import * as roomController from '../controllers/room';

const router = Router();

router.get('/', roomController.room_GET);

router.post('/submit', roomController.submit_POST);

router
  .route('/delete/:id')
  .get(roomController.delete_GET)
  .post(roomController.delete_POST);

export default router;
