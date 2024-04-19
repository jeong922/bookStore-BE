import { getBooksByKeyword } from '../model/search.js';

export async function searchKeyword(req, res, next) {
  const { keyword, maxResults, page } = req.query;
  const { userId } = req.body;
  const books = await getBooksByKeyword(keyword, +maxResults, page, userId);
  res.status(200).json(books);
}
