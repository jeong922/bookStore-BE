import bcrypt from 'bcrypt';
import { config } from '../config.js';

export async function makeHash(password: string) {
  const saltRounds = config.bcrypt.saltRounds;
  return bcrypt.hash(password, saltRounds);
}

export async function validatePassword(password: string, userPassword: string) {
  return bcrypt.compare(password, userPassword);
}
