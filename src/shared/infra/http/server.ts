import 'reflect-metadata';
import '@config/env';

import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import cors from 'cors';
import 'express-async-errors';

import { AppError } from '../../errors/AppError';
import routes from './routes';

import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb',
  }),
);

app.use(routes);

app.use(errors());

app.use((err: Error, __: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT, async () => {
  const mongoURL = process.env.MONGO_URL as string;
  const database = process.env.MONGO_DATABASE as string;

  mongoose.connect(mongoURL, { dbName: database });

  // eslint-disable-next-line no-console
  console.log(
    'App is running at http://localhost:%d in %s mode',
    process.env.PORT,
    process.env.NODE_ENV,
  );
});

export default app;
