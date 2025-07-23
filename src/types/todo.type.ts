import z from 'zod';

export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const TodoListSchema = z.array(TodoSchema);

export const GetTodoListQueryScema = z.object({
  isCompleted: z.enum(['true', 'false']).optional(),
});

export const GetTodoParamsSchema = z.object({
  id: z.string(),
});
