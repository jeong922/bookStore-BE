import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { bookImages, getAllBooks, getBookById } from '../model/books.js';

export async function allBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { categoryId, newBook, maxResults, page } = req.query;
  const userId = req.userId;
  const isNewBook = newBook === 'true' ? true : false;

  const books = await getAllBooks(
    categoryId,
    isNewBook,
    maxResults,
    page,
    userId
  );
  res.status(StatusCodes.OK).json(books);
}

export async function bookDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);
  const userId = req.userId;
  const book = await getBookById(id, userId);
  if (!book) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }

  const images = await bookImages(id);

  res.status(StatusCodes.OK).json({ ...book, images });
}
