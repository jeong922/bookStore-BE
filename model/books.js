import { conn } from '../db/mariadb.js';

const SELECT_JOIN =
  'SELECT b.id, b.title, b.cover, b.form, b.author, b.isbn, b.pages, b.summary, b.detail, b.contents, b.price, b.published_date, c.category FROM books AS b JOIN categories AS c on b.category_id = c.id';

export async function getAllBooks() {
  const sql = `${SELECT_JOIN} ORDER BY id`;
  return conn
    .promise()
    .execute(sql)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function getAllBooksByCategory(catagoryId) {
  const sql = `${SELECT_JOIN} WHERE category_id=?`;
  return conn
    .promise()
    .execute(sql, [catagoryId])
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function getBookById(id) {
  const sql = `${SELECT_JOIN} WHERE b.id=?`;
  return conn
    .promise()
    .execute(sql, [id])
    .then((result) => result[0][0])
    .catch((err) => {
      console.log(err);
    });
}

export async function bookImages(id) {
  const sql = `SELECT * FROM book_images WHERE book_id=?`;
  return conn
    .promise()
    .execute(sql, [id])
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}
