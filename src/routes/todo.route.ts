import { createRoute } from '@hono/zod-openapi';
import {
  GetTodoListQuerySchema,
  GetTodoParamsSchema,
  CreateTodoBodySchema,
  UpdateTodoParamsSchema,
  UpdateTodoBodySchema,
  DeleteTodoParamsSchema,
  TodoListSchema,
  TodoSchema,
  CreateTodoResponseSchema,
  UpdateTodoResponseSchema,
  DeleteTodoResponseSchema,
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
      description: 'Successfully fetched todo list',
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
      description: 'Successfully fetched todo by ID',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    404: createErrorResponse('GENERIC', 'Todo not found'),
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
      required: true,
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: CreateTodoResponseSchema,
        },
      },
      description: 'Successfully created todo',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const updateTodoRoute = createRoute({
  operationId: 'updateTodo',
  tags: ['todo'],
  method: 'patch',
  path: '/todo/{id}',
  request: {
    params: UpdateTodoParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateTodoBodySchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UpdateTodoResponseSchema,
        },
      },
      description: 'Successfully updated todo',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    404: createErrorResponse('GENERIC', 'Todo not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const deleteTodoRoute = createRoute({
  operationId: 'deleteTodo',
  tags: ['todo'],
  method: 'delete',
  path: '/todo/{id}',
  request: {
    params: DeleteTodoParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: DeleteTodoResponseSchema,
        },
      },
      description: 'Successfully deleted todo',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    404: createErrorResponse('GENERIC', 'Todo not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});