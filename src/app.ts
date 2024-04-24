import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from './config.js';
import { limiter } from './middleware/rateLimiter.js';
import usersRouter from './routes/users.js';
import booksRouter from './routes/books.js';
import cartsRouter from './routes/carts.js';
import likesRouter from './routes/likes.js';
import ordersRouter from './routes/orders.js';
import reviewsRouter from './routes/reviews.js';
import searchRouter from './routes/search.js';
import categoryRouter from './routes/category.js';

const port = config.host.port;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(limiter);

app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/books', booksRouter);
app.use('/carts', cartsRouter);
app.use('/likes', likesRouter);
app.use('/orders', ordersRouter);
app.use('/reviews', reviewsRouter);
app.use('/search', searchRouter);

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
