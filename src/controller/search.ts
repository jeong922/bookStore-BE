import { NextFunction, Request, Response } from 'express';
import { getBooksByKeyword } from '../model/search.js';

export async function searchKeyword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { keyword, maxResults, page } = req.query;
  const userId = req.userId;

  const books = await getBooksByKeyword(
    keyword as string,
    +maxResults,
    +page,
    userId
  );
  res.status(200).json(books);
}
