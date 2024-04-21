import mariadb from 'mysql2/promise';
import { config } from '../config.js';
const { host, user, password, database, port } = config.db;
export const order = async (req, res) => {
  const conn = await mariadb.createConnection({
    host,
    user,
    password,
    database,
    port,
    dateStrings: true,
  });

  const {
    userId,
    mainBookTitle,
    items,
    delivery,
    totalPrice,
    totalQuantity,
    paymentInformation,
  } = req.body;

  // delivery
  const { address, receiver, contact } = delivery;
  const deliverySql = `INSERT INTO deliveries (address, receiver, contact, user_id) VALUES(?, ?, ?, ?)`;
  const deliveryValues = [address, receiver, contact, userId];
  const [deliveryResult] = await conn.execute(deliverySql, deliveryValues);
  const deliveryId = deliveryResult.insertId;

  // SELECT book_id, quantity FROM cartItems WEHRE id IN ()
  const selectSql =
    'SELECT book_id AS bookId, quantity FROM cartItems WHERE id IN (?)';
  const [orderItems] = await conn.query(selectSql, [items]);

  // addOrder
  const orderSql = `INSERT INTO orders (user_id, delivery_id, total_price, main_book_title, total_quantity, payment_information)
  	VALUES(?, ?, ?, ?, ?, ?)`;
  const orderValues = [
    userId,
    deliveryId,
    totalPrice,
    mainBookTitle,
    totalQuantity,
    paymentInformation,
  ];
  const [orderResult] = await conn.execute(orderSql, orderValues);
  const orderId = orderResult.insertId;

  // addOrderedBook;
  const bookIdArr = orderItems.map((item) => [
    orderId,
    item.bookId,
    item.quantity,
  ]);
  const orderedSql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
  const [ordered] = await conn.query(orderedSql, [bookIdArr]);

  const deleteSql = 'DELETE FROM cartItems WHERE id IN (?)';
  const deleteValues = [items];
  const deleteItems = await conn.query(deleteSql, deleteValues);

  res.status(201).json(ordered);
};
