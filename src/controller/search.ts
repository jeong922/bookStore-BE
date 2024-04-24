import { NextFunction, Request, Response } from 'express';
import { SearchCount, getBooksByKeyword } from '../model/search.js';
import { StatusCodes } from 'http-status-codes';

export async function searchKeyword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { keyword, maxResults, page } = req.query;
    const userId = req.userId;

    const books = await getBooksByKeyword(
      keyword as string,
      +maxResults,
      +page,
      userId
    );
    const count = await SearchCount(keyword);
    const result = {
      books,
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
