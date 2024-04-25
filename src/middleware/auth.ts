import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { getByUserId } from '../model/users.js';
import { verifyJwtToken } from '../service/jwt.js';

export async function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: '인증 오류' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decodedJwt = await verifyJwtToken(token);

    const user = await getByUserId(decodedJwt.id);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: '인증 오류' });
    }

    req.userId = decodedJwt.id;

    return next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: '로그인 세션이 만료되었습니다.' });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: '유효하지 않은 토큰입니다.' });
    }
  }
}

export async function optionalEnsureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.get('Authorization');
  if (!authHeader || !(authHeader && authHeader.startsWith('Bearer '))) {
    next();
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedJwt = await verifyJwtToken(token);

    const user = await getByUserId(decodedJwt.id);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: '인증 오류' });
    }

    req.userId = decodedJwt.id;

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: '로그인 세션이 만료되었습니다.' });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: '유효하지 않은 토큰입니다.' });
    }
  }
}
