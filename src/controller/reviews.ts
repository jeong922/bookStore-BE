import { NextFunction, Request, RequestHandler, Response } from 'express';
import {
  addReviewById,
  deleteReview,
  getReviewsBookId,
  getReviewsUserId,
  reviewCount,
  updateReviewById,
} from '../model/reviews.js';

export async function getReviews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { maxResults, page } = req.query;
  const bookId = +req.params.bookId;
  const reviews = await getReviewsBookId(bookId, maxResults, page);
  const count = await reviewCount({ bookId });

  const result = {
    reviews,
    pagination: {
      currentPage: +page,
      totalCount: count ? count.totalCount : 0,
    },
  };

  res.status(200).json(result);
}

export async function addReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { text, bookId } = req.body;
  const userId = req.userId;
  const review = userId && (await addReviewById(+bookId, userId, text));

  res.status(201).json(review);
}

export async function updateReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { text, reviewId } = req.body;
  const userId = req.userId;

  const updatedReview =
    userId && (await updateReviewById(+reviewId, text, userId));
  res.status(200).json(updatedReview);
}

export async function removeReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reviewId = +req.body.reviewId;
  const userId = req.userId;

  const deletedReview = userId && (await deleteReview(reviewId, userId));
  res.status(200).json(deletedReview);
}

export async function getUserReviews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { maxResults, page } = req.query;
  const userId = req.userId;
  const reviews =
    userId && (await getReviewsUserId(userId, +maxResults, +page));
  const count = await reviewCount({ userId });

  const result = {
    reviews,
    pagination: {
      currentPage: +page,
      totalCount: count ? count.totalCount : 0,
    },
  };
  res.status(200).json(result);
}
