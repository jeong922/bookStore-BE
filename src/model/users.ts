import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { conn } from '../db/mariadb.js';

export async function getByUserEmail(email: string) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  try {
    const [result]: [RowDataPacket[], FieldPacket[]] = await conn
      .promise()
      .execute(sql, [email]);

    return result[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getByUserId(id: number) {
  const sql = 'SELECT * FROM users WHERE id = ?';

  try {
    const [result]: [RowDataPacket[], FieldPacket[]] = await conn
      .promise()
      .execute(sql, [id]);

    return result[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  const sql = 'INSERT INTO users (name, email, password) VALUES(?, ?, ?)';
  const values = [name, email, password];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return (result as ResultSetHeader).insertId;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updatePassword(password: string, email: string) {
  const sql = 'UPDATE users SET password=? WHERE email=?';
  const values = [password, email];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateUserInfo(
  id: number,
  contact: string,
  address: string
) {
  const sql = 'UPDATE users SET contact=?, address=? WHERE id=?';
  const values = [contact, address, id];

  try {
    const [result] = await conn.promise().execute(sql, values);

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
