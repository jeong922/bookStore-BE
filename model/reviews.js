import { conn } from '../db/mariadb.js';

export async function addReviewById(bookId, userId, review) {
  const sql = `INSERT INTO reviews (book_id, user_id, review) VALUES(?, ?, ?)`;
  const values = [bookId, userId, review];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function getReviewsBookId(bookId) {
  const sql = `SELECT * FROM reviews WHERE book_id=?`;
  const values = [bookId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function getReviewsUserId(userId) {
  const sql = `SELECT * FROM reviews WHERE user_id=?`;
  const values = [userId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function updateReviewById(id, review, userId) {
  const sql = `UPDATE reviews SET review=? WHERE id=? AND user_id=?`;
  const values = [review, id, userId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function deleteReview(id, userId) {
  const sql = `DELETE FROM reviews WHERE id=? AND user_id=?`;
  const values = [id, userId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}
