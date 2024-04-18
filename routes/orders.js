import express from 'express';
import * as orderController from '../controller/orders.js';
import { order } from '../controller/ordersTest.js';

const router = express.Router();

// 주문 등록
router.post('/', orderController.order);
// router.post('/', order);

// 주문 목록 조회
router.get('/', orderController.getOrders);

// 주문 상세 조회
router.get('/:id', orderController.getOrderDetail);

export default router;
