import jwt from 'jsonwebtoken';
import { CookieOptions, Response } from 'express';
import { config } from '../config.js';
export function createJwtToken(id: number) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
    issuer: config.jwt.issuer,
  });
}

export function setToken(res: Response, token: string) {
  const options: CookieOptions = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };

  return res.cookie('token', token, options);
}
