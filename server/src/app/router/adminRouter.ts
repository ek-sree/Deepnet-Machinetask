import { upload } from '../../utils/multer.js';
import AdminController from '../../app/controller/adminController.js';
import express from 'express'
import { authenticateToken } from '../../middleware/authMiddleware.js';

const adminRouter = express.Router();

const adminController = new AdminController();


adminRouter.post('/addCategory',authenticateToken, upload, adminController.addCategory);
adminRouter.get('/getAllCategories',authenticateToken, adminController.getCategoried);
adminRouter.post('/addProduct',authenticateToken, adminController.addProducts);
adminRouter.get('/getProducts',authenticateToken, adminController.getProducts);

export {adminRouter}