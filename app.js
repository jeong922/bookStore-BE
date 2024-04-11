import express from 'express';
import morgan from 'morgan';
import { config } from './config.js';
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
app.use(morgan('tiny'));

app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/books', booksRouter);
app.use('/carts', cartsRouter);
app.use('/likes', likesRouter);
app.use('/orders', ordersRouter);
app.use('/reviews', reviewsRouter);
app.use('/search', searchRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
