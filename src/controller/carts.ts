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
  const { bookId, quantity, userId } = req.body;
  const item = await getCartItem(userId, bookId);

  if (item) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: '이미 장바구니에 담겨 있습니다.' });
  }

  const cart = await addCart(bookId, quantity, userId);

  res.status(StatusCodes.CREATED).json(cart);
}

export async function removeCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const item = await removeCartById(+id);
  res.status(StatusCodes.OK).json(item);
}

export async function getCartItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId, seletedItems } = req.body;

  const cart = await getCartItemsList(userId, seletedItems);

  res.status(StatusCodes.OK).json(cart);
}

export async function updateCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = +req.params.id;
  const quantity = +req.body.quantity;

  const item = await updateItem(id, quantity);

  res.status(StatusCodes.OK).json(item);
}
