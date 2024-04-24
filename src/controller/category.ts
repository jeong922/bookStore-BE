import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getAllCategories } from '../model/category.js';

export async function categories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await getAllCategories();
    res.status(StatusCodes.OK).json(data);
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
