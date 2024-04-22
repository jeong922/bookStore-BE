import express from 'express';
import * as bookController from '../controller/books.js';
import { param, query } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { optionalEnsureAuth } from '../middleware/auth.js';

const router = express.Router();

const validateQuery = [
  query('categoryId').isInt().optional().withMessage('숫자로 입력해 주세요.'),
  query('newBook')
    .isBoolean()
    .optional()
    .withMessage('true 또는 false로만 입력해 주새요.'),
  query('maxResults')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('1이상 숫자로 입력해 주세요.'),
  query('page')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('1이상 숫자로 입력해 주세요.'),
  validate,
];

const validateId = [
  param('id').notEmpty().isInt().withMessage('숫자로 입력해주세요.'),
  validate,
];

// 전체 조회
router.get('/', optionalEnsureAuth, validateQuery, bookController.allBooks);

// 개별 조회
router.get('/:id', optionalEnsureAuth, validateId, bookController.bookDetail);

export default router;
