import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export function createJwtToken(id: number) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
    issuer: config.jwt.issuer,
  });
}
