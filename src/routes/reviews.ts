import express from 'express';
import * as reviewController from '../controller/reviews.js';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateBookId = [
  param('bookId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  validate,
];

const validateReview = [
  body('userId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  body('bookId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  body('text')
    .notEmpty()
    .trim()
    .isLength({ min: 1 })
    .withMessage('최소 한 글자 이상 입력해 주세요.'),
  validate,
];

const validateUpdateReview = [
  body('userId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  body('reviewId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  body('text')
    .notEmpty()
    .trim()
    .isLength({ min: 1 })
    .withMessage('최소 한 글자 이상 입력해 주세요.'),
  validate,
];

const validateRemoveReview = [
  body('userId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  body('reviewId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  validate,
];

const validateUserId = [
  body('userId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  validate,
];

// 도서별 리뷰 조회
router.get('/:bookId', validateBookId, reviewController.getReviews);

// 리뷰 작성
router.post('/', validateReview, reviewController.addReview);

// 리뷰 수정
router.put('/', validateUpdateReview, reviewController.updateReview);

// 리뷰 삭제
router.delete('/', validateRemoveReview, reviewController.removeReview);

// 리뷰 회원별 조회
router.get('/', validateUserId, reviewController.getUserReviews);

export default router;
