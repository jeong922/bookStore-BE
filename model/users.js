// 이화정

import { conn } from '../db/mariadb.js';

export async function getByUserEmail(email) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  return await conn
    .promise()
    .execute(sql, [email])
    .then((result) => result[0][0])
    .catch((err) => {
      console.log(err);
    });
}

export async function getByUserId(id) {
  const sql = 'SELECT * FROM users WHERE id = ?';
  return await conn
    .promise()
    .execute(sql, [id])
    .then((result) => result[0][0])
    .catch((err) => {
      console.log(err);
    });
}

export async function createUser(name, email, password, salt) {
  const sql =
    'INSERT INTO users (name, email, password, salt) VALUES(?, ?, ?, ?)';
  const values = [name, email, password, salt];
  return await conn
    .promise()
    .execute(sql, values)
    .then((result) => result[0])
    .catch((err) => {
      console.log(err);
    });
}

export async function updatePassword(password, email, salt) {
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

export async function updateUserInfo(id, contact, address) {
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
