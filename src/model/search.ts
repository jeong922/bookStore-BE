import { FieldPacket, RowDataPacket } from 'mysql2';
import { conn } from '../db/mariadb.js';

export async function getBooksByKeyword(
  keyword: string,
  maxResults: number,
  page: number,
  userId: number | undefined
) {
  const offset = maxResults * (page - 1);
  const values = userId
    ? [userId, `%${keyword}%`, offset, maxResults]
    : [`%${keyword}%`, offset, maxResults];

  const sql = `${makeJoinQuery(
    userId
  )} WHERE b.title LIKE ? ORDER BY b.id LIMIT ?, ?`;
  console.log(sql, values);
  try {
    const [result] = await conn.promise().query(sql, values);

    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function SearchCount(keyword: string) {
  let values = [`%${keyword}%`];
  const sql = `SELECT COUNT(*) AS totalCount FROM books AS b JOIN categories AS c on b.category_id = c.id WHERE b.title LIKE ?`;

  try {
    const [result]: [RowDataPacket[], FieldPacket[]] = await conn
      .promise()
      .query(sql, values);

    return result[0];
  } catch (err) {
    console.error(err);
  }
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
