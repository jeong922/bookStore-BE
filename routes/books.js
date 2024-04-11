import express from 'express';
import * as bookController from '../controller/books.js';
import { param, query } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateQuery = [
  query('categoryId').isInt().withMessage('categoryId를 숫자로 입력해 주세요.'),
  query('newBook')
    .isBoolean()
    .withMessage('true 또는 false로만 입력해 주새요.'),
  validate,
];

const validateId = [
  param('id').notEmpty().isInt().withMessage('id를 숫자로 입력해주세요.'),
  validate,
];

// FIXME: 페이징 구현 필요

// 전체 조회 -> req.query가 있는 경우 카테고리별 조회
router.get('/', validateQuery, bookController.allBooks);

// 개별 조회
router.get('/:id', validateId, bookController.bookDetail);

export default router;
