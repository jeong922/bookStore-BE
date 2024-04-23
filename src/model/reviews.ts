import { conn } from '../db/mariadb.js';

export async function addReviewById(
  bookId: number,
  userId: number,
  review: string
) {
  const sql = `INSERT INTO reviews (book_id, user_id, review) VALUES(?, ?, ?)`;
  const values = [bookId, userId, review];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function getReviewsBookId(bookId: number) {
  const sql = `SELECT r.id, r.book_id AS bookId, r.review, r.created_at AS createdAt, r.updated_at AS updatedAt, u.id AS userId, u.name, u.email
   FROM reviews AS r JOIN users AS u ON r.user_id = u.id WHERE book_id=?`;
  const values = [bookId];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function getReviewsUserId(userId: number) {
  const sql = `SELECT id, book_id AS bookId, review, created_at AS createdAt, updated_at AS updatedAt FROM reviews WHERE user_id=?`;
  const values = [userId];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function updateReviewById(
  id: number,
  review: string,
  userId: number
) {
  const sql = `UPDATE reviews SET review=? WHERE id=? AND user_id=?`;
  const values = [review, id, userId];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteReview(id: number, userId: number) {
  const sql = `DELETE FROM reviews WHERE id=? AND user_id=?`;
  const values = [id, userId];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}
