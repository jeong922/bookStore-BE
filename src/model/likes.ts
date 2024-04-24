import { conn } from '../db/mariadb.js';

export async function addLike(bookId: number, userId: any) {
  const sql = 'INSERT INTO likes (book_id, user_id) VALUES(?, ?)';
  const values = [bookId, userId];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function removelike(bookId: number, userId: number) {
  const sql = 'DELETE FROM likes WHERE book_id=? AND user_id=?';
  const values = [bookId, userId];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
