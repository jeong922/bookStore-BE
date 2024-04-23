import { conn } from '../db/mariadb.js';

export async function getAllCategories() {
  const sql = 'SELECT * FROM categories ORDER BY id';

  try {
    const [result] = await conn.promise().execute(sql);

    return result;
  } catch (err) {
    console.error(err);
  }
}
