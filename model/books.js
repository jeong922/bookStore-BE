import { conn } from '../db/mariadb.js';

const SELECT_JOIN = `SELECT b.id, b.title, b.cover, b.form, b.author, b.isbn, b.pages, b.summary, b.detail, b.contents, b.price, b.published_date, c.category 
                    FROM books AS b JOIN categories AS c on b.category_id = c.id`;

export async function getAllBooks(catagoryId, newBook, maxResults, page) {
  const offset = maxResults * (page - 1);
  const values = catagoryId
    ? [catagoryId, offset, maxResults]
    : [offset, maxResults];
  let query = '';

  if (catagoryId && newBook) {
    query =
      'WHERE category_id=? AND published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
  } else if (catagoryId) {
    query = 'WHERE category_id=?';
  } else if (newBook) {
    query =
      'WHERE published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
  }

  const sql = `${SELECT_JOIN} ${query} ORDER BY id LIMIT ?, ?`;

  return conn
    .promise()
    .execute(sql, values)
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
  const sql = `SELECT id, url FROM book_images WHERE book_id=?`;
  return conn
    .promise()
    .execute(sql, [id])
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}
