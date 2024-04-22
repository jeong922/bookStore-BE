import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { conn } from '../db/mariadb.js';

export async function getByUserEmail(email: string) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  return await conn
    .promise()
    .execute<RowDataPacket[]>(sql, [email])
    .then((result) => result[0][0])
    .catch((err) => {
      console.log(err);
    });
}

export async function getByUserId(id: number) {
  const sql = 'SELECT * FROM users WHERE id = ?';
  return await conn
    .promise()
    .execute<RowDataPacket[]>(sql, [id])
    .then((result) => result[0][0])
    .catch((err) => {
      console.log(err);
    });
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  salt: string
) {
  const sql =
    'INSERT INTO users (name, email, password, salt) VALUES(?, ?, ?, ?)';
  const values = [name, email, password, salt];
  return await conn
    .promise()
    .execute(sql, values)
    .then((result) => (result[0] as ResultSetHeader).insertId)
    .catch((err) => {
      console.log(err);
    });
}

export async function updatePassword(
  password: string,
  email: string,
  salt: string
) {
  const sql = 'UPDATE users SET password=?, salt=? WHERE email=?';
  const values = [password, salt, email];
  return await conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function updateUserInfo(
  id: number,
  contact: string,
  address: string
) {
  const sql = 'UPDATE users SET contact=?, address=? WHERE id=?';
  const values = [contact, address, id];
  return await conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}
