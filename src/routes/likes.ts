import express from 'express';
import * as likeController from '../controller/likes.js';
import { param } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

const validateLike = [
  param('bookId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  validate,
];

// 좋아요 추가
router.post('/:bookId', ensureAuth, validateLike, likeController.likeBook);

// 좋아요 삭제
router.delete('/:bookId', ensureAuth, validateLike, likeController.dislikeBook);

export default router;
