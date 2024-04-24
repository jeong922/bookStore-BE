import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  bookImages,
  booksCount,
  getAllBooks,
  getBookById,
} from '../model/books.js';

export async function allBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { categoryId, newBook, maxResults, page } = req.query;
    const userId = req.userId;
    const isNewBook = newBook === 'true' ? true : false;
    const books = await getAllBooks(
      +categoryId,
      isNewBook,
      +maxResults,
      +page,
      userId
    );
    const count = await booksCount(+categoryId, isNewBook);
    const result = {
      books,
      pagination: {
        currentPage: +page,
        totalCount: count ? count.totalCount : 0,
      },
    };
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function bookDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = +req.params.id;
    const userId = req.userId;
    const book = await getBookById(id, userId);

    if (!book) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    const images = await bookImages(id);

    res.status(StatusCodes.OK).json({ ...book, images });
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
