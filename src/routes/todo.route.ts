import { createRoute, z } from '@hono/zod-openapi';
import {
  GetTodoListQuerySchema,
  GetTodoParamsSchema,
  TodoListSchema,
  TodoSchema,
  CreateTodoSchema,
  UpdateTodoSchema,
} from '~/types/todo.type';
import { createErrorResponse } from '~/utils/error-response-factory';

export const getTodoListRoute = createRoute({
  operationId: 'getTodoList',
  tags: ['todo'],
  method: 'get',
  path: '/todo',
  request: {
    query: GetTodoListQuerySchema,
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
    401: createErrorResponse('GENERIC', 'Unauthorized'),
    404: createErrorResponse('GENERIC', 'Not found'),
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
    401: createErrorResponse('GENERIC', 'Unauthorized'),
    404: createErrorResponse('GENERIC', 'Not found'),
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
          schema: CreateTodoSchema,
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
      description: 'Create a new todo',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    401: createErrorResponse('GENERIC', 'Unauthorized'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const updateTodoRoute = createRoute({
  operationId: 'updateTodo',
  tags: ['todo'],
  method: 'patch',
  path: '/todo/{id}',
  request: {
    params: GetTodoParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateTodoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TodoSchema,
        },
      },
      description: 'Update a todo by ID',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    401: createErrorResponse('GENERIC', 'Unauthorized'),
    404: createErrorResponse('GENERIC', 'Not found'),
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
    204: {
      description: 'Delete a todo by ID',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    401: createErrorResponse('GENERIC', 'Unauthorized'),
    404: createErrorResponse('GENERIC', 'Not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});