import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { config } from '../config.js';
import { getByUserId } from '../model/users.js';

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
    const decodedJwt = jwt.verify(token, config.jwt.secretKey) as JwtPayload;

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
    }

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '유효하지 않은 토큰입니다.' });
  }
}

export async function optionalEnsureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.get('Authorization');
  try {
    if (!authHeader || !(authHeader && authHeader.startsWith('Bearer '))) {
      // throw new ReferenceError('jwt must be provided');
      next();
      return;
    }

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decodedJwt = jwt.verify(token, config.jwt.secretKey) as JwtPayload;

      const user = await getByUserId(decodedJwt.id);

      if (!user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: '인증 오류' });
      }

      req.userId = decodedJwt.id;
      next();
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: '로그인 세션이 만료되었습니다.' });
    }

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '유효하지 않은 토큰입니다.' });
  }
}
