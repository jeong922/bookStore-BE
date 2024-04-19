import express from 'express';
import * as likeController from '../controller/likes.js';

const router = express.Router();

// 좋아요 추가
router.post('/:bookId', likeController.likeBook);

// 좋아요 삭제
router.delete('/:bookId', likeController.dislikeBook);

export default router;
