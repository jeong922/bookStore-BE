import { conn } from '../db/mariadb.js';

function makeJoinQuery(userId) {
  return `SELECT b.id, b.title, b.cover, b.form, b.author, b.isbn, b.pages, b.summary, b.detail, b.contents, b.price, b.published_date AS publishedDate, c.category,
                    (SELECT COUNT(*) FROM likes AS l WHERE l.book_id = b.id) AS likes${
                      userId
                        ? ', (SELECT EXISTS(SELECT * FROM likes AS l WHERE l.user_id = ? and l.book_id = b.id)) AS liked'
                        : ', 0 as liked'
                    }
                    FROM books AS b JOIN categories AS c on b.category_id = c.id`;
}

export async function getBooksByKeyword(keyword, maxResults, page, userId) {
  const offset = maxResults * (page - 1);
  let values = [offset, maxResults];

  values = userId ? [userId, ...values] : values;
  const sql = `${makeJoinQuery(
    userId
  )} WHERE b.title LIKE "%${keyword}%" ORDER BY id LIMIT ?, ?`;

  return conn
    .promise()
    .query(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}
