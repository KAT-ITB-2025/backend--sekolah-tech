import { createErrorResponse } from '~/utils/error-response-factory';
import { createRoute, z } from '@hono/zod-openapi';
import {
    GetTodoListQueryScema,
    GetTodoParamsSchema,
    TodoListSchema,
    TodoSchema,
    PostTodoBodySchema,
    UpdateTodoBodySchema,
    UpdateTodoParamsSchema,
    DeleteTodoParamsSchema,  
} from '~/types/todo.type'

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

export const postTodoRoute = createRoute({
  operationId: 'postTodo',
  tags: ['todo'],
  method: 'post',
  path: '/todo/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: PostTodoBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Todo successfully created',
      content: {
        'application/json': {
          schema: TodoSchema,
        },
      },
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
    params : UpdateTodoParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateTodoBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Todo successfully updated',
      content: {
        'application/json': {
          schema: UpdateTodoBodySchema,
        },
      },
    },
    404: createErrorResponse('UNION', 'Todo not found'),
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
    params : DeleteTodoParamsSchema,
  },
  responses: {
    200: {
      description: 'Todo successfully deleted',
      },
    },
    404: createErrorResponse('UNION', 'Todo not found'),
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },);