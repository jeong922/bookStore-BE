import express from 'express';
import morgan from 'morgan';
import { config } from './config.js';

const port = config.host.port;
const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
