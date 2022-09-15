import 'reflect-metadata';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import Container from 'typedi';
import { AppRouter } from './api/trpc/app-router';
import { createContext } from './api/trpc/context';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const appRouter = Container.get(AppRouter);

app.use('/trpc', trpcExpress.createExpressMiddleware({
  router: appRouter.getRouter(),
  createContext,
}));

app.listen(3000, () => {
  console.log('Listening to port 3000');
});