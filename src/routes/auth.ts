import { Router } from 'express';
import * as authController from '../controllers/auth';

const router = Router();

router.get('/sign-up', authController.signup_GET);

router.get('/log-in', authController.login_GET);

export default router;
