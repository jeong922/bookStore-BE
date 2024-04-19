import express from 'express';
import * as reviewController from '../controller/reviews.js';

const router = express.Router();

// 도서별 리뷰 조회
router.get('/:bookId', reviewController.getReviews);

// 리뷰 작성
router.post('/', reviewController.addReview);

// 리뷰 수정
router.put('/', reviewController.updateReview);

// 리뷰 삭제
router.delete('/', reviewController.removeReview);

// 리뷰 회원별 조회
router.get('/', reviewController.getUserReviews);

export default router;
