import { conn } from '../db/mariadb.js';

export async function addLike(bookId: number, userId: number) {
  const sql = 'INSERT INTO likes (book_id, user_id) VALUES(?, ?)';
  const values = [bookId, userId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function removelike(bookId: number, userId: number) {
  const sql = 'DELETE FROM likes WHERE book_id=? AND user_id=?';
  const values = [bookId, userId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}
