import { rateLimit } from 'express-rate-limit';
import { config } from '../config.js';

export const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  handler: (req, res, next, options) =>
    res.status(429).json({
      message: '너무 많은 요청을 하셨습니다. 나중에 다시 시도해 주세요.',
    }),
});
