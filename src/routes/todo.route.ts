import { createRoute, z } from '@hono/zod-openapi';
import {
  GetTodoListQueryScema,
  GetTodoParamsSchema,
  TodoListSchema,
  TodoSchema,
} from '~/types/todo.type';
import { createErrorResponse } from '~/utils/error-response-factory';

export const getTodoListRoute = createRoute({
  operationId: 'getTodoList',
  tags: ['todo'],
  method: 'get',
  path: '/todo',
  request: {
    query: GetTodoListQueryScema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TodoListSchema,
        },
      },
      description: 'Get the list of todos',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const getTodoRoute = createRoute({
  operationId: 'getTodo',
  tags: ['todo'],
  method: 'get',
  path: '/todo/{id}',
  request: {
    params: GetTodoParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TodoSchema,
        },
      },
      description: 'Get a todo by ID',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
