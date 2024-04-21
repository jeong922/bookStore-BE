import { conn } from '../db/mariadb.js';

export async function getAllCategories() {
  const sql = 'SELECT * FROM categories ORDER BY id';
  return conn
    .promise()
    .execute(sql)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}
