import { createRoute, z } from '@hono/zod-openapi';
import { GetTodoListQuerySchema, TodoListSchema, GetTodoParamsSchema, TodoSchema, PostTodoSchema, PatchTodoParamsSchema, DeleteTodoParamsSchema, DeletedTodoResponseSchema} from '~/types/todo.type';
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
      description: 'List of todos',
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
    params: GetTodoParamsSchema
  },
  responses : {
    200: {
      content: {
        'application/json': {
          schema: TodoSchema,
        },
      },
      description: 'Get a todo by ID',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    404: createErrorResponse('VALIDATION', 'Todo not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  }
});

export const postTodoRoute = createRoute({
  operationId: 'postTodo',
  tags: ['todo'],
  method: 'post',
  path: '/todo',
  request: {
    body : {
      content: {
        'application/json': {
          schema: PostTodoSchema,
        },
      },
      required: true,
    }
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
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const patchTodoRoute = createRoute({
  operationId: 'patchTodo',
  tags: ['todo'],
  method: 'patch',
  path: '/todo/{id}',
  request: {
    params: GetTodoParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: PatchTodoParamsSchema,
        },
      },
      required: true,
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
    404: createErrorResponse('VALIDATION', 'Todo not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const deleteTodoRoute = createRoute({
  operationId: 'deleteTodo',
  tags: ['todo'],
  path: '/todo/{id}',
  method: 'delete',
  request: {
    params: DeleteTodoParamsSchema,
  },
  responses: {
    200: {
      description: 'Todo deleted successfully',
      content: {
        'application/json': {
          schema: DeletedTodoResponseSchema,
        },
      },
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    404: createErrorResponse('VALIDATION', 'Todo not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
