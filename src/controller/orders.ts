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
  //TODO:userId 받아오기 수정
  const {
    userId,
    items,
    delivery,
    totalPrice,
    totalQuantity,
    paymentInformation,
  } = req.body;

  const deliveryId = await addDelivery(delivery, userId);

  const orderId = await addOrder(
    items,
    userId,
    deliveryId,
    totalPrice,
    totalQuantity,
    paymentInformation
  );

  const ordered = await addOrdered(orderId, items);

  const deleteItems = await removeCartItemsByIds(items);

  res.status(201).json(ordered);
}

export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.body;
  const orders = await getOrderList(userId);

  res.status(200).json(orders);
}

export async function getOrderDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = +req.params.id;
  const detail = await getOrderById(id);

  res.status(200).json(detail);
}
