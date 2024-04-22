import { NextFunction, Request, Response } from 'express';
import { removeCartItemsByIds } from '../model/carts.js';
import {
  addDelivery,
  addOrder,
  addOrdered,
  getOrderById,
  getOrderList,
} from '../model/orders.js';

export async function order(req: Request, res: Response, next: NextFunction) {
  const { items, delivery, totalPrice, totalQuantity, paymentInformation } =
    req.body;

  const userId = req.userId;
  const deliveryId = userId && (await addDelivery(delivery, userId));

  const orderId =
    userId &&
    (await addOrder(
      items,
      userId,
      deliveryId,
      totalPrice,
      totalQuantity,
      paymentInformation
    ));

  const ordered = await addOrdered(orderId, items);

  const deleteItems = await removeCartItemsByIds(items);

  res.status(201).json({ message: '주문이 완료 되었습니다.' });
}

export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const orders = userId && (await getOrderList(userId));

  res.status(200).json(orders);
}

export async function getOrderDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const orderId = +req.params.id;
  const detail = await getOrderById(orderId);

  res.status(200).json(detail);
}
