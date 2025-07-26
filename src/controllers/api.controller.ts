import { OpenAPIHono } from '@hono/zod-openapi';

import { healthRouter } from './health.controller';
import { todo } from 'node:test';
import { todoRouter } from './todo.controller';

const unprotectedApiRouter = new OpenAPIHono();
unprotectedApiRouter.route('/', healthRouter);
unprotectedApiRouter.route('/', todoRouter);

const protectedApiRouter = new OpenAPIHono();

export const apiRouter = new OpenAPIHono();
apiRouter.route('/', unprotectedApiRouter);
apiRouter.route('/', protectedApiRouter);
