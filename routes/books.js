import express from 'express';
import * as bookController from '../controller/books.js';

const router = express.Router();

// FIXME: 페이징 구현 필요

// 전체 조회 -> req.query가 있는 경우 카테고리별 조회
router.get('/', bookController.allBooks);

// 개별 조회
router.get('/:id', bookController.bookDetail);

export default router;
