import express from 'express';

const router = express.Router();

// 키워드 검색
router.get('/', (req, res, next) => {
  console.log(req.query);
  res.status(200).json('키워드 검색');
});

export default router;
