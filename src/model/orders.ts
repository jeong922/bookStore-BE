import { ResultSetHeader } from 'mysql2';
import { conn } from '../db/mariadb.js';
import { Item } from './carts.js';

type Delivery = {
  address: string;
  receiver: string;
  contact: string;
};

export async function addOrder(
  items: Item[],
  userId: number,
  deliveryId: number | void,
  totalPrice: number,
  totalQuantity: number,
  paymentInformation: string
) {
  const mainBookTitle = items && items.length && items[0].title;
  const sql = `INSERT INTO orders (user_id, delivery_id, total_price, main_book_title, total_quantity, payment_information) 
	VALUES(?, ?, ?, ?, ?, ?)`;
  const values = [
    userId,
    deliveryId,
    totalPrice,
    mainBookTitle,
    totalQuantity,
    paymentInformation,
  ];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return (result as ResultSetHeader).insertId;
  } catch (err) {
    console.error(err);
  }
}

export async function addOrdered(orderId: number, items: Item[]) {
  const bookIdArr = items.map((item) => [orderId, item.bookId, item.quantity]);
  const sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

  try {
    const [result] = await conn.promise().query(sql, [bookIdArr]);
    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function getOrderList(userId: number) {
  const sql = `SELECT o.id, o.created_at AS createdAt, o.main_book_title AS bookTitle, o.total_price AS totalPrice, o.total_quantity AS totalQuantity,
	o.payment_information AS paymentInformation, d.address, d.receiver, d.contact
	FROM orders AS o JOIN deliveries AS d ON o.delivery_id = d.id 
	WHERE o.user_id=?`;
  const values = [userId];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function getOrderById(orderId: number) {
  const sql = `SELECT ob.book_id AS bookId, b.title, b.author, b.price, ob.quantity
	FROM orderedBook AS ob JOIN orders AS o ON ob.order_id = o.id JOIN books AS b ON ob.book_id = b.id 
	WHERE ob.order_id=?`;
  const values = [orderId];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}

// delivery
export async function addDelivery(delivery: Delivery, userId: number) {
  const { address, receiver, contact } = delivery;
  const sql = `INSERT INTO deliveries (address, receiver, contact, user_id) VALUES(?, ?, ?, ?)`;
  const values = [address, receiver, contact, userId];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return (result as ResultSetHeader).insertId;
  } catch (err) {
    console.error(err);
  }
}

export async function getDeliveryByUserId(userId: number) {
  const sql = `SELECT * FROM deliveries WHERE user_id=?`;
  const values = [userId];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}
