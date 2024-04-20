import express from 'express';
import * as cartController from '../controller/carts.js';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateAddCartItem = [
  body('bookId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  body('quantity')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('1 이상의 숫자로 입력해 주세요.'),
  body('userId').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  validate,
];

const validateRemoveCartItem = [
  param('id').notEmpty().isInt().withMessage('숫자로 입력해 주세요.'),
  validate,
];

const validateGetCartItems = [
  body('userId').isInt().withMessage('숫자로 입력해 주세요.'),
  body('seletedItems')
    .optional()
    .isArray()
    .withMessage('배열로 입력해 주세요.')
    .custom((value) => {
      if (!value.every((item) => Number.isInteger(item) && item > 0)) {
        throw new Error('1 이상의 정수만 포함되게 입력해 주세요.');
      }
      return true;
    }),
  validate,
];

const validateUpdateCartItem = [
  param('id').isInt().withMessage('숫자로 입력해 주세요.'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('1 이상의 숫자로 입력해 주세요.'),
  validate,
];

// 장바구니 담기
router.post('/', validateAddCartItem, cartController.addCartItem);

// 장바구니 조회
router.get('/', validateGetCartItems, cartController.getCartItems);

// 장바구니 삭제
router.delete('/:id', validateRemoveCartItem, cartController.removeCartItem);

// 장바구니 수량 수정
router.put('/:id', validateUpdateCartItem, cartController.updateCartItem);

export default router;
