import express from 'express';

const router = express.Router();

// 좋아요 추가
router.post('/:userId/:bookId', (req, res, next) => {
  res.status(201).json('좋아요 추가');
});

// 좋아요 삭제
router.delete('/:userId/:bookId', (req, res, next) => {
  res.status(200).json('좋아요 삭제');
});

export default router;
