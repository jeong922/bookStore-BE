import { StatusCodes } from 'http-status-codes';
import {
  bookImages,
  getAllBooks,
  getAllBooksByCategory,
  getBookById,
} from '../model/books.js';

export async function allBooks(req, res, next) {
  const { categoryId, newBook } = req.query;

  if (categoryId) {
    const bookByCategory = await getAllBooksByCategory(+categoryId);
    return res.status(StatusCodes.OK).json(bookByCategory);
  }

  const books = await getAllBooks();
  res.status(StatusCodes.OK).json(books);
}

export async function bookDetail(req, res, next) {
  const id = parseInt(req.params.id);
  const book = await getBookById(id);
  if (!book) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }

  // 요구사항을 보면 상세페이지에는 이미지를 여러장 보여주라고 되어있음.
  const images = await bookImages(id);

  res.status(StatusCodes.OK).json({ ...book, images });
}
