import { StatusCodes } from 'http-status-codes';
import { getAllCategories } from '../model/category.js';

export async function categories(req, res, next) {
  const data = await getAllCategories();
  res.status(StatusCodes.OK).json(data);
}
