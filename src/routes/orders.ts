import express from 'express';
import * as orderController from '../controller/orders.js';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateOrderId = [
  param('id').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  validate,
];

export const validateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('최소한 하나의 상품이 필요합니다.'),
  body('items.*.cartItemId')
    .notEmpty()
    .isInt()
    .withMessage('숫자로 입력해 주세요.'),
  body('items.*.bookId')
    .notEmpty()
    .isInt()
    .withMessage('숫자로 입력해 주세요.'),
  body('items.*.title')
    .notEmpty()
    .trim()
    .isLength({ min: 1 })
    .withMessage('한글자 이상 문자로 입력해 주세요.'),
  body('items.*.quantity')
    .notEmpty()
    .isInt()
    .withMessage('숫자로 입력해 주세요.'),
  body('delivery.address')
    .notEmpty()
    .trim()
    .withMessage('주소를 입력해 주세요.'),
  body('delivery.receiver')
    .notEmpty()
    .trim()
    .withMessage('수령인을 입력해 주세요.'),
  body('delivery.contact')
    .notEmpty()
    .trim()
    .withMessage('연락처를 입력해 주세요.'),
  body('totalPrice')
    .notEmpty()
    .isNumeric()
    .withMessage('숫자로 입력해 주세요.'),
  body('totalQuantity').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  body('paymentInformation')
    .notEmpty()
    .trim()
    .withMessage('결제 정보를 입력해 주세요.'),
  validate,
];

// 주문 등록
router.post('/', validateOrder, orderController.order);

// 주문 목록 조회
router.get('/', orderController.getOrders);

// 주문 상세 조회
router.get('/:id', validateOrderId, orderController.getOrderDetail);

export default router;
