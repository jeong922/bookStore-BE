import express from 'express';
import * as cartController from '../controller/carts.js';

const router = express.Router();

// 장바구니 담기
router.post('/', cartController.addCartItem);

// 장바구니 조회
router.get('/', cartController.getCartItems);

// 장바구니 삭제
router.delete('/:id', cartController.removeCartItem);

// 장바구니 수량 수정
router.put('/:id', cartController.updateCartItem);

export default router;
