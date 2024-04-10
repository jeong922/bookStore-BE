import express from 'express';
import * as userController from '../controller/users.js';

const router = express.Router();

// 회원가입
router.post('/join', userController.join);

// 로그인
router.post('/login', userController.login);

// 비밀번호 초기화 요청
router.post('/reset', userController.passwordResetRequest);

// 비밀번호 초기화
router.put('/reset', userController.passwordReset);

// 회원 개별 조회
router.get('/:id', userController.getUser);

// 회원 정보 수정
router.put('/:id', userController.updateUser);

export default router;
