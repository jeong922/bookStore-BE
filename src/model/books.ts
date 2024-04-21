import { RowDataPacket } from 'mysql2';
import { conn } from '../db/mariadb.js';

export async function getAllBooks(
  catagoryId: number,
  newBook: boolean,
  maxResults: number,
  page: number,
  userId: number | undefined
) {
  const offset = maxResults * (page - 1);
  let values = catagoryId
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

  values = userId ? [userId, ...values] : values;
  const sql = `${makeJoinQuery(userId)} ${query} ORDER BY id LIMIT ?, ?`;
  return conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function getBookById(id: number, userId: number) {
  const sql = `${makeJoinQuery(userId)} WHERE b.id=?`;
  const values = userId ? [userId, id] : [id];

  return conn
    .promise()
    .execute<RowDataPacket[]>(sql, values)
    .then((result) => result[0][0])
    .catch((err) => {
      console.log(err);
    });
}

export async function bookImages(id: number) {
  const sql = `SELECT id, url FROM bookImages WHERE book_id=?`;
  return conn
    .promise()
    .execute(sql, [id])
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

function makeJoinQuery(userId: number | undefined) {
  return `SELECT b.id, b.title, b.cover, b.form, b.author, b.isbn, b.pages, b.summary, b.detail, b.contents, b.price, b.published_date AS publishedDate, c.category,
                    (SELECT COUNT(*) FROM likes AS l WHERE l.book_id = b.id) AS likes${
                      userId
                        ? ', (SELECT EXISTS(SELECT * FROM likes AS l WHERE l.user_id = ? and l.book_id = b.id)) AS liked'
                        : ', 0 as liked'
                    }
                    FROM books AS b JOIN categories AS c on b.category_id = c.id`;
}