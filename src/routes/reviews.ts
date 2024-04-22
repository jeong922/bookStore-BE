import express from 'express';
import * as reviewController from '../controller/reviews.js';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

const validateBookId = [
  param('bookId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  validate,
];

const validateReview = [
  body('bookId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  body('text')
    .notEmpty()
    .trim()
    .isLength({ min: 1 })
    .withMessage('최소 한 글자 이상 입력해 주세요.'),
  validate,
];

const validateUpdateReview = [
  body('reviewId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  body('text')
    .notEmpty()
    .trim()
    .isLength({ min: 1 })
    .withMessage('최소 한 글자 이상 입력해 주세요.'),
  validate,
];

const validateRemoveReview = [
  body('reviewId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  validate,
];

// 도서별 리뷰 조회
router.get('/:bookId', validateBookId, reviewController.getReviews);

// 리뷰 작성
router.post('/', ensureAuth, validateReview, reviewController.addReview);

// 리뷰 수정
router.put(
  '/',
  ensureAuth,
  validateUpdateReview,
  reviewController.updateReview
);

// 리뷰 삭제
router.delete(
  '/',
  ensureAuth,
  validateRemoveReview,
  reviewController.removeReview
);

// 리뷰 회원별 조회
router.get('/', ensureAuth, reviewController.getUserReviews);

export default router;
