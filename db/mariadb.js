import mysql from 'mysql2';
import { config } from '../config.js';

const { host, user, password, database, port } = config.db;
export const conn = mysql.createConnection({
  host,
  user,
  password,
  database,
  port,
  dateStrings: true,
});
