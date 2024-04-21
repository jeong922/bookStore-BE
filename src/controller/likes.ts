import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addLike, removelike } from '../model/likes.js';

// TODO:권한 확인 구현 필요

export async function likeBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bookId = +req.params.bookId;
  const userId = +req.body.userId;
  const like = await addLike(bookId, userId);

  res.status(StatusCodes.OK).json(like);
}

export async function dislikeBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bookId = +req.params.bookId;
  const userId = +req.body.userId;
  const like = await removelike(bookId, userId);

  res.status(StatusCodes.OK).json(like);
}
