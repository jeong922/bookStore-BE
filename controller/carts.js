import { StatusCodes } from 'http-status-codes';
import {
  addCart,
  getCartItem,
  getCartItemsList,
  removeCartById,
  updateItem,
} from '../model/carts.js';

export async function addCartItem(req, res, next) {
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

export async function removeCartItem(req, res, next) {
  const { id } = req.params;
  const item = await removeCartById(id);
  res.status(StatusCodes.OK).json(item);
}

export async function getCartItems(req, res, next) {
  const { userId, seletedItems } = req.body;

  const cart = await getCartItemsList(userId, seletedItems);

  res.status(StatusCodes.OK).json(cart);
}

export async function updateCartItem(req, res, next) {
  const { id } = req.params;
  const { quantity } = req.body;

  const item = await updateItem(id, quantity);

  res.status(StatusCodes.OK).json(item);
}
