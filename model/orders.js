import { conn } from '../db/mariadb.js';

export async function addOrder(
  items,
  userId,
  deliveryId,
  totalPrice,
  totalQuantity,
  paymentInformation
) {
  const mainBookTitle = items[0].title;
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
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0].insertId)
    .catch((err) => {
      console.log(err);
    });
}

export async function addOrdered(orderId, items) {
  const bookIdArr = items.map((item) => [orderId, item.bookId, item.quantity]);
  const sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
  return conn
    .promise()
    .execute(sql, [bookIdArr])
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function getOrderList(userId) {
  const sql = `SELECT o.id, o.created_at AS createdAt, o.main_book_title AS bookTitle, o.total_price AS totalPrice, o.total_quantity AS totalQuantity,
	o.payment_information AS paymentInformation, d.address, d.receiver, d.contact
	FROM orders AS o JOIN deliveries AS d ON o.delivery_id = d.id 
	WHERE o.user_id=?`;
  const values = [userId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function getOrderById(orderId) {
  const sql = `SELECT ob.book_id AS bookId, b.title, b.author, b.price, ob.quantity
	FROM orderedBook AS ob JOIN orders AS o ON ob.order_id = o.id JOIN books AS b ON ob.book_id = b.id 
	WHERE ob.order_id=?`;
  const values = [orderId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

// delivery
export async function addDelivery(delivery, userId) {
  const { address, receiver, contact } = delivery;
  const sql = `INSERT INTO deliveries (address, receiver, contact, user_id) VALUES(?, ?, ?, ?)`;
  const values = [address, receiver, contact, userId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0].insertId)
    .catch((err) => {
      console.log(err);
    });
}

export async function getDeliveryByUserId(userId) {
  const sql = `SELECT * FROM deliveries WHERE user_id=?`;
  const values = [userId];
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}
