import {
  addReviewById,
  deleteReview,
  getReviewsBookId,
  getReviewsUserId,
  updateReviewById,
} from '../model/reviews.js';

export async function getReviews(req, res, next) {
  const { bookId } = req.params;
  const review = await getReviewsBookId(bookId);
  res.status(200).json(review);
}

export async function addReview(req, res, next) {
  const { userId, text, bookId } = req.body;
  const review = await addReviewById(bookId, userId, text);

  res.status(201).json(review);
}

export async function updateReview(req, res, next) {
  const { userId, text, reviewId } = req.body;
  const updatedReview = await updateReviewById(reviewId, text, userId);
  res.status(200).json(updatedReview);
}

export async function removeReview(req, res, next) {
  const { userId, reviewId } = req.body;
  const deletedReview = await deleteReview(reviewId, userId);
  res.status(200).json(deletedReview);
}

export async function getUserReviews(req, res, next) {
  const { userId } = req.body;
  const reviews = await getReviewsUserId(userId);
  res.status(200).json(reviews);
}
