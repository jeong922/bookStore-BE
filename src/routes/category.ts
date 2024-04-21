import express from 'express';
import * as categoryController from '../controller/category.js';

const router = express.Router();

router.get('/', categoryController.categories);

export default router;
