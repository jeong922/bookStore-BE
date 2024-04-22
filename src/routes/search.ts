import express from 'express';
import * as searchController from '../controller/search.js';
import { query } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { optionalEnsureAuth } from '../middleware/auth.js';

const router = express.Router();

const validateKeyword = [
  query('keyword')
    .notEmpty()
    .withMessage('검색어를 입력해주세요.')
    .trim()
    .isLength({ min: 1 })
    .withMessage('최소 한 글자 이상 입력해주세요.'),
  query('maxResults')
    .notEmpty()
    .withMessage('숫자로 입력해 주세요.')
    .isInt()
    .withMessage('숫자로 입력해 주세요.'),
  query('page')
    .notEmpty()
    .withMessage('숫자로 입력해 주세요.')
    .isInt()
    .withMessage('숫자로 입력해 주세요.'),
  validate,
];

// 키워드 검색
router.get(
  '/',
  optionalEnsureAuth,
  validateKeyword,
  searchController.searchKeyword
);

export default router;
