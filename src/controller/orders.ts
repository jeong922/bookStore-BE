import { NextFunction, Request, Response } from 'express';
import { removeCartItemsByIds } from '../model/carts.js';
import {
  addDelivery,
  addOrder,
  addOrdered,
  getOrderById,
  getOrderList,
  orderListCount,
} from '../model/orders.js';
import { StatusCodes } from 'http-status-codes';

export async function order(req: Request, res: Response, next: NextFunction) {
  try {
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

    const ordered = orderId && (await addOrdered(orderId, items));

    const deleteItems = await removeCartItemsByIds(items);

    res.status(201).json({ message: '주문이 완료 되었습니다.' });
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { maxResults, page } = req.query;
    const userId = req.userId;
    const orders = userId && (await getOrderList(userId, +maxResults, +page));
    const count = userId && (await orderListCount(userId));

    const result = {
      orders,
      pagination: {
        currentPage: +page,
        totalCount: count ? count.totalCount : 0,
      },
    };
    res.status(200).json(result);
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function getOrderDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orderId = +req.params.id;
    const detail = await getOrderById(orderId);

    res.status(200).json(detail);
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
