import { Router } from 'express';
import * as authController from '../controllers/auth';

const router = Router();

router.get('/sign-up', authController.signup_GET);

export default router;
