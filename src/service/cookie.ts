import { CookieOptions, Response } from 'express';
import { config } from '../config.js';

export function setToken(res: Response, token: string) {
  const options: CookieOptions = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };

  return res.cookie('token', token, options);
}
