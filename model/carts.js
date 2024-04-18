import { conn } from '../db/mariadb.js';

export async function addCart(bookId, quantity, userId) {
  const sql =
    'INSERT INTO cartItems (book_id, quantity, user_id) VALUES(?, ?, ?)';
  const values = [bookId, quantity, userId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function removeCartById(id) {
  const sql = 'DELETE FROM cartItems WHERE id=?';
  const values = [id];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function getCartItemsList(userId, seletedItems) {
  const sql = `SELECT c.id, c.book_id AS bookId, b.title, b.summary, c.quantity, b.price 
		FROM cartItems AS c JOIN books AS b ON c.book_id = b.id 
		WHERE user_id=? ${
      seletedItems ? `AND c.id IN(${seletedItems.join(', ')})` : ''
    }`;

  const values = [userId];

  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function getCartItem(userId, bookId) {
  const sql = 'SELECT * FROM cartItems WHERE user_id=? AND book_id=?';
  const values = [userId, bookId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0][0])
    .catch((err) => {
      console.log(err);
    });
}

export async function updateItem(id, quantity) {
  const sql = 'UPDATE cartItems SET quantity=? WHERE id=?';
  const values = [quantity, id];
  return await conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}
