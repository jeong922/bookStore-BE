import { FieldPacket, RowDataPacket } from 'mysql2';
import { conn } from '../db/mariadb.js';

export type Item = {
  cartItemId: number;
  bookId: number;
  title: string;
  quantity: number;
};

export async function addCart(
  bookId: number,
  quantity: number,
  userId: number
) {
  const sql =
    'INSERT INTO cartItems (book_id, quantity, user_id) VALUES(?, ?, ?)';
  const values = [bookId, quantity, userId];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function removeCartById(id: number) {
  const sql = 'DELETE FROM cartItems WHERE id=?';
  const values = [id];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function removeCartItemsByIds(items: Item[]) {
  const idArr = items.map((item) => item.cartItemId);
  const sql = 'DELETE FROM cartItems WHERE id IN (?)';
  const values = [idArr];

  try {
    const [result] = await conn.promise().query(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}

type CartItemValues = number | number[];

export async function getCartItemsList(
  userId: number,
  seletedItems?: number[]
) {
  let sql = `SELECT c.id, c.book_id AS bookId, b.title, b.summary, c.quantity, b.price 
		FROM cartItems AS c JOIN books AS b ON c.book_id = b.id 
		WHERE user_id=?`;

  const values: CartItemValues[] = [userId];

  if (seletedItems && seletedItems.length > 0) {
    sql += ' AND c.id IN (?) ';
    values.push(seletedItems);
  }

  try {
    const [result] = await conn.promise().query(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function getCartItem(userId: number, bookId: number) {
  const sql = 'SELECT * FROM cartItems WHERE user_id=? AND book_id=?';
  const values = [userId, bookId];

  try {
    const [result]: [RowDataPacket[], FieldPacket[]] = await conn
      .promise()
      .execute(sql, values);

    return result[0];
  } catch (err) {
    console.error(err);
  }
}

export async function updateItem(id: number, quantity: number) {
  const sql = 'UPDATE cartItems SET quantity=? WHERE id=?';
  const values = [quantity, id];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}
