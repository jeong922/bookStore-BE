import express from 'express';

const router = express.Router();

// 도서별 리뷰 조회
router.get('/:id', (req, res, next) => {
  res.json('도서별 리뷰 조회');
});

// 리뷰 작성
router.post('/:id', (req, res, next) => {
  res.status(201).json('리뷰 작성');
});

// 리뷰 수정
router.put('/:id', (req, res, next) => {
  res.status(200).json('리뷰 수정');
});

// 리뷰 삭제
router.delete('/:id', (req, res, next) => {
  res.status(200).json('리뷰 삭제');
});

export default router;
