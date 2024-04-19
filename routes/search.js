import express from 'express';
import * as searchController from '../controller/search.js';

const router = express.Router();

// 키워드 검색
router.get('/', searchController.searchKeyword);

export default router;
