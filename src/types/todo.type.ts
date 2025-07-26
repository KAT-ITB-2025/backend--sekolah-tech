import z from 'zod';

export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  isCompleted: z.boolean(),
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

export const CreateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export const UpdateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  isCompleted: z.boolean().optional(),
});