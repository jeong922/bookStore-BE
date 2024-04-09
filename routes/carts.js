import express from 'express';

const router = express.Router();

// 장바구니 담기
router.post('/', (req, res, next) => {
  res.status(201).json('장바구니 담기');
});

// 장바구니 조회
router.get('/', (req, res, next) => {
  res.status(200).json('장바구니 조회');
});

// 장바구니 삭제
router.delete('/:id', (req, res, next) => {
  res.status(200).json('장바구니 삭제');
});

// 장바구니 수정
router.put('/:id', (req, res, next) => {
  res.status(200).json('장바구니 수정');
});

// 장바구니 선택 상품 조회
router.post('/:id', (req, res, next) => {
  res.status(200).json('장바구니 담기');
});

export default router;
