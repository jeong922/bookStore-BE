import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  addCart,
  getCartItem,
  getCartItemsList,
  removeCartById,
  updateItem,
} from '../model/carts.js';

export async function addCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { bookId, quantity } = req.body;
    const userId = req.userId;

    const item = userId && (await getCartItem(userId, bookId));

    if (item) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: '이미 장바구니에 담겨 있습니다.' });
    }

    const cart = userId && (await addCart(bookId, quantity, userId));

    res.status(StatusCodes.CREATED).json(cart);
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function removeCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = +req.params.id;
    const item = await removeCartById(id);
    res.status(StatusCodes.OK).json(item);
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function getCartItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const seletedItems = req.body.seletedItems;
    const userId = req.userId;
    const cart = userId && (await getCartItemsList(userId, seletedItems));

    res.status(StatusCodes.OK).json(cart);
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function updateCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = +req.params.id;
    const quantity = +req.body.quantity;

    const item = await updateItem(id, quantity);

    res.status(StatusCodes.OK).json(item);
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
