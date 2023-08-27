import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const router = Router();
const loginController = new LoginController();

router.post('/login', loginController.login);

export default router;
