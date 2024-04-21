import { NextFunction, Request, RequestHandler, Response } from 'express';
import {
  addReviewById,
  deleteReview,
  getReviewsBookId,
  getReviewsUserId,
  updateReviewById,
} from '../model/reviews.js';

export async function getReviews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bookId = +req.params.bookId;
  const review = await getReviewsBookId(bookId);
  res.status(200).json(review);
}

export async function addReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId, text, bookId } = req.body;
  const review = await addReviewById(+bookId, +userId, text);

  res.status(201).json(review);
}

export async function updateReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId, text, reviewId } = req.body;
  const updatedReview = await updateReviewById(+reviewId, text, +userId);
  res.status(200).json(updatedReview);
}

export async function removeReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId, reviewId } = req.body;
  const deletedReview = await deleteReview(+reviewId, +userId);
  res.status(200).json(deletedReview);
}

export async function getUserReviews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = +req.body.userId;
  const reviews = await getReviewsUserId(userId);
  res.status(200).json(reviews);
}
