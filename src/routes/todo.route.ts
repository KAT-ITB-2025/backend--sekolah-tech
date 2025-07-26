import { createRoute, z } from '@hono/zod-openapi';
import {
  GetTodoListQueryScema,
  GetTodoParamsSchema,
  TodoListSchema,
  TodoSchema,
  CreateTodoBodySchema,
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

export const createTodoRoute = createRoute({
  operationId: 'createTodo',
  tags: ['todo'],
  method: 'post',
  path: '/todo',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateTodoBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: TodoSchema,
        },
      },
      description: 'Todo created successfully',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const deleteTodoRoute = createRoute({
  operationId: 'deleteTodo',
  tags: ['todo'],
  method: 'delete',
  path: '/todo/{id}',
  request: {
    params: GetTodoParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: 'Todo deleted successfully',
    },
    404: createErrorResponse('GENERIC', 'Todo not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});