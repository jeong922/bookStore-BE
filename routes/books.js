import express from 'express';
import * as bookController from '../controller/books.js';
import { param, query } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateQuery = [
  query('categoryId')
    .isInt()
    .optional()
    .withMessage('categoryId를 숫자로 입력해 주세요.'),
  query('newBook')
    .isBoolean()
    .optional()
    .withMessage('true 또는 false로만 입력해 주새요.'),
  query('maxResults')
    .notEmpty()
    .isInt()
    .withMessage('maxResults를 숫자로 입력해 주세요.'),
  query('page').notEmpty().isInt().withMessage('page를 숫자로 입력해 주세요.'),
  validate,
];

const validateId = [
  param('id').notEmpty().isInt().withMessage('id를 숫자로 입력해주세요.'),
  validate,
];

// 전체 조회
router.get('/', validateQuery, bookController.allBooks);

// 개별 조회
router.get('/:id', validateId, bookController.bookDetail);

export default router;
