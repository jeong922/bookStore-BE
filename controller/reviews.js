export async function getReviews(req, res, next) {
  res.status(200).json('도서별 리뷰 조회');
}

export async function addReview(req, res, next) {
  res.status(201).json('리뷰 작성');
}

export async function updateReview(req, res, next) {
  res.status(200).json('리뷰 수정');
}

export async function removeReview(req, res, next) {
  res.status(200).json('리뷰 삭제');
}
