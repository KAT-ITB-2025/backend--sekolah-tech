import { serve } from '@hono/node-server';
import { OpenAPIHono, z } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { type RequestIdVariables } from 'hono/request-id';

import { env } from './configs/env.config.js';
import { apiRouter } from './controllers/api.controller.js';

const app = new OpenAPIHono<{
  Variables: RequestIdVariables;
}>({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ error: result.error.flatten() }, 400);
    }
  },
});

app.use(
  '/api/*',
  cors({
    credentials: true,
    origin: env.ALLOWED_ORIGINS,
  }),
);

app.get('/', (c) => c.json({ message: 'Server runs successfully' }));

app.route('/api', apiRouter);

app.doc('/openapi.json', {
  openapi: '3.1.0',
  info: {
    version: '1.0',
    title: 'Sekolah Backend Technology API',
  },
  tags: [{ name: 'health', description: 'Health Check API' }],
});

app.get(
  '/docs',
  Scalar({
    theme: 'moon',
    layout: 'modern',
    url: '/openapi.json',
  }),
);

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
