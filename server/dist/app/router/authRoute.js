import AuthController from '../controller/authController.js';
import express from 'express';
const authRouter = express.Router();
const authController = new AuthController();
authRouter.post('/login', authController.verifyAdmin);
authRouter.post('/logout', authController.logout);
export { authRouter };
