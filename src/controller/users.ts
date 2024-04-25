import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createUser,
  getByUserEmail,
  getByUserId,
  updatePassword,
  updateUserInfo,
} from '../model/users.js';
import { makeHash, validatePassword } from '../service/hashPassword.js';
import { setToken } from '../service/cookie.js';
import { createJwtToken } from '../service/jwt.js';

export async function join(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;

    const user = await getByUserEmail(email);

    if (user) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: '이미 존재하는 이메일 입니다.' });
    }

    const hashPassword = await makeHash(password);

    const createdUserId = await createUser(name, email, hashPassword);

    const token = await createJwtToken(createdUserId);

    setToken(res, token);

    res.sendStatus(StatusCodes.CREATED);
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await getByUserEmail(email);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: '이메일 또는 비밀번호가 유효하지 않습니다.' });
    }

    const isValidPassword = await validatePassword(password, user.password);

    if (!isValidPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: '이메일 또는 비밀번호가 유효하지 않습니다.' });
    }

    const token = await createJwtToken(user.id);

    setToken(res, token);

    res.status(StatusCodes.OK).json({ name: user.name, email: user.email });
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function passwordResetRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;
    const user = await getByUserEmail(email);

    if (!user) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    return res.status(StatusCodes.OK).json({ email });
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function passwordReset(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await getByUserEmail(email);

    const isValidPassword = await validatePassword(password, user.password);

    if (isValidPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: '이전 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.',
      });
    }

    const hashPassword = await makeHash(password);
    const updatedPassword = await updatePassword(hashPassword, email);

    res.status(StatusCodes.OK).json(updatedPassword);
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const user = await getByUserId(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: '회원을 찾을 수 없습니다.' });
    }

    const { name, email, contact, address } = user;
    res.status(StatusCodes.OK).json({ id, name, email, contact, address });
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
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
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
