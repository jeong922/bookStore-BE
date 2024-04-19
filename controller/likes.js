import { StatusCodes } from 'http-status-codes';
import { addLike, removelike } from '../model/likes.js';

// TODO:권한 확인 구현 필요

export async function likeBook(req, res, next) {
  const { bookId } = req.params;
  const { userId } = req.body;
  const like = await addLike(bookId, userId);

  res.status(StatusCodes.OK).json(like);
}

export async function dislikeBook(req, res, next) {
  const { bookId } = req.params;
  const { userId } = req.body;
  const like = await removelike(bookId, userId);

  res.status(StatusCodes.OK).json(like);
}
