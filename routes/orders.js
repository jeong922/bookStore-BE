import express from 'express';

const router = express.Router();

// 주문 등록
router.post('/', (req, res, next) => {
  res.status(201).json('주문 등록');
});

// 주문 목록 조회
router.get('/', (req, res, next) => {
  res.status(200).json('주문 목록 조회');
});

// 주문 상세 조회
router.get('/:id', (req, res, next) => {
  res.status(200).json('주문 상세 조회');
});

export default router;
