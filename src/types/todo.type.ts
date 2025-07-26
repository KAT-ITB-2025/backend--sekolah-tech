import { desc, is } from 'drizzle-orm';
import z from 'zod';

export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  isCompleted: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const TodoListSchema = z.array(TodoSchema);

export const GetTodoListQueryScema = z.object({
  isCompleted: z.enum(['true', 'false']).optional(),
});

export const GetTodoParamsSchema = z.object({
  id: z.string(),
});

export const PostTodoBodySchema = z.object({
    title: z.string().trim().min(1, 'Title is required'),
    description: z.string().optional(),
    isCompleted: z.boolean().default(false),
}).strict();

export const UpdateTodoParamsSchema = z.object({
  id: z.string(),
});

export const UpdateTodoBodySchema = z.object({
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  isCompleted: z.boolean().nullable().optional(),
});

export const DeleteTodoParamsSchema = z.object({
    id: z.string(),
});
