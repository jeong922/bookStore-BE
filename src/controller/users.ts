import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '../config.js';
import {
  createUser,
  getByUserEmail,
  getByUserId,
  updatePassword,
  updateUserInfo,
} from '../model/users.js';

export async function join(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;

  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = createHash(password, salt);

  const user = await getByUserEmail(email);

  if (user) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: '이미 존재하는 이메일 입니다.' });
  }

  const createdUserId = await createUser(name, email, hashPassword, salt);

  const token = createJWTToken(createdUserId);

  setToken(res, token);

  res.sendStatus(StatusCodes.CREATED);
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  const user = await getByUserEmail(email);

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '이메일 또는 비밀번호가 유효하지 않습니다.' });
  }

  const hashPassword = createHash(password, user.salt);

  if (user.password !== hashPassword) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '이메일 또는 비밀번호가 유효하지 않습니다.' });
  }

  const token = createJWTToken(user.id);

  setToken(res, token);

  // FIXME:json으로 token 넘겨주는거 삭제
  res
    .status(StatusCodes.OK)
    .json({ name: user.name, email: user.email, token });
}

export async function passwordResetRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  const user = await getByUserEmail(email);

  if (!user) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  return res.status(StatusCodes.OK).json({ email });
}

export async function passwordReset(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  const user = await getByUserEmail(email);

  const hanshNewPassword = user && createHash(password, user.salt);

  if (user && user.password === hanshNewPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '이전 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.',
    });
  }
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = createHash(password, salt);
  const updatedPassword = await updatePassword(hashPassword, email, salt);

  res.status(StatusCodes.OK).json(updatedPassword);
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id);
  const user = await getByUserId(id);

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: '회원을 찾을 수 없습니다.' });
  }

  const { name, email, contact, address } = user;
  res.status(StatusCodes.OK).json({ id, name, email, contact, address });
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);
  const { contact, address } = req.body;
  const user = await getByUserId(id);

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: '회원을 찾을 수 없습니다.' });
  }

  const updatedUser = await updateUserInfo(id, contact, address);

  res.sendStatus(StatusCodes.OK);
}

function createJWTToken(id: number | void) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    // expiresIn: config.jwt.expiresInSec,
    expiresIn: '5m',
    issuer: 'jeong',
  });
}

function setToken(res: Response, token: string) {
  const options: CookieOptions = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };

  return res.cookie('token', token, options);
}

function createHash(password: string, salt: string) {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
    .toString('base64');
}
