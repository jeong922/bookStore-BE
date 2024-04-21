import express from 'express';
import * as userController from '../controller/users.js';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateEmail = [
  body('email')
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage('유효하지 않은 이메일 입니다.'),
];

const validatePassword = [
  body('password')
    .notEmpty()
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('비밀번호는 6글자 이상 20글자 이하로 입력해주세요.'),
];

const validateName = [
  body('name')
    .notEmpty()
    .trim()
    .isLength({ min: 2 })
    .withMessage('이름을 두글자 이상 입력해주세요.'),
];

const validateEmailAndPassword = [
  ...validateEmail,
  ...validatePassword,
  validate,
];

const validateId = [
  param('id').notEmpty().isInt().withMessage('id를 숫자로 입력해주세요.'),
  validate,
];

const validateJoin = [...validateName, ...validateEmailAndPassword];

// 회원가입
router.post('/join', validateJoin, userController.join);

// 로그인
router.post('/login', validateEmailAndPassword, userController.login);

// 비밀번호 초기화 요청
router.post(
  '/reset',
  [...validateEmail, validate],
  userController.passwordResetRequest
);

// 비밀번호 초기화
router.put(
  '/reset',
  [...validatePassword, validate],
  userController.passwordReset
);

// 회원 개별 조회
router.get('/:id', validateId, userController.getUser);

// 회원 정보 수정
router.put('/:id', validateId, userController.updateUser);

export default router;
