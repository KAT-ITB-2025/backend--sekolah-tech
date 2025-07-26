import { type createRoute, z } from '@hono/zod-openapi';

export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const TodoListSchema = z.array(TodoSchema);

export const GetTodoListQuerySchema = z.object({
  isCompleted: z.enum(['true', 'false']).optional(),
});

export const GetTodoParamsSchema = z.object({
  id: z.string(),
});

export const PostTodoSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string(),
});

export const PatchTodoParamsSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  isCompleted: z.boolean().nullable(),
});

export const DeleteTodoParamsSchema = z.object({
  id: z.string(),
});

export const DeletedTodoResponseSchema = z.object({
  message: z.string(),
  data: TodoSchema,
});
