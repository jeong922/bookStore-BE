import express from 'express';
import * as reviewController from '../controller/reviews.js';

const router = express.Router();

// 도서별 리뷰 조회
router.get('/:bookId', reviewController.getReviews);

// 리뷰 작성
router.post('/:bookId', reviewController.addReview);

// 리뷰 수정
router.put('/:reviewId', reviewController.updateReview);

// 리뷰 삭제
router.delete('/:reviewId', reviewController.removeReview);

export default router;
