import * as trpc from '@trpc/server';
import { Context } from './context';

export interface Router {
  getRouter(): trpc.AnyRouter;
}

export const createRouter = () => {
  return trpc.router<Context>();
}