import { Router } from 'express';
import * as authController from '../controllers/auth';

const router = Router();

router
  .route('/sign-up')
  .get(authController.signup_GET)
  .post(authController.signup_POST);

router
  .route('/log-in')
  .get(authController.login_GET)
  .post(authController.login_POST);

router.get('/log-out', authController.logout_GET);

export default router;
