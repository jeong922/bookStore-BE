import express from 'express';

const router = express.Router();

// 회원가입
router.post('/join', (req, res, next) => {
  res.status(201).json('회원가입');
});

// 로그인
router.post('/login', (req, res, next) => {
  res.status(200).json('로그인');
});

// 비밀번호 초기화 요청
router.post('/reset', (req, res, next) => {
  res.status(200).json('비밀번호 초기화 요청');
});

// 비밀번호 초기화
router.put('/reset', (req, res, next) => {
  res.status(200).json('비밀번호 초기화');
});

// 회원 개별 조회
router.get('/:id', (req, res, next) => {
  res.status(200).json('회원 개별 조회');
});

// 회원 정보 수정
router.put('/:id', (req, res, next) => {
  res.status(200).json('회원 정보 수정');
});

export default router;
