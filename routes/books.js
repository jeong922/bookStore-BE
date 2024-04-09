import express from 'express';

const router = express.Router();

// FIXME: 페이징 구현 필요

// 전체 조회 -> req.query가 있는 경우 카테고리별 조회
router.get('/', (req, res, next) => {
  console.log(req.query);
  res.status(200).json('도서 전체 조회');
});

// 개별 조회
router.get('/:id', (req, res, next) => {
  res.status(200).json('도서 개별 조회');
});

export default router;
