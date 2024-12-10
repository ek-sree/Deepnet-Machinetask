import UserController from '../../app/controller/userController.js';
import express from 'express'

const userRouter = express.Router();

const userController = new UserController();


userRouter.get('/getCategorys', userController.getCategoried);
userRouter.get('/getProducts', userController.getPoroducts);

export {userRouter}