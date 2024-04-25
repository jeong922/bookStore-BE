import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config.js';

export async function createJwtToken(id: number) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
    issuer: config.jwt.issuer,
  });
}

export async function verifyJwtToken(token: string) {
  return jwt.verify(token, config.jwt.secretKey) as JwtPayload;
}
