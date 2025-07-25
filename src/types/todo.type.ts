import {createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { todo } from '~/db/schema/todo.schema';

export const TodoSchema = createSelectSchema(todo);

export const CreateTodoBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
}).strict();

export const UpdateTodoBodySchema = z.object({
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(), 
  isCompleted: z.boolean().nullable().optional(),
}).strict();

export const TodoListSchema = z.array(TodoSchema);

export const GetTodoListQuerySchema = z.object({
  isCompleted: z.enum(['true', 'false']).optional(),
});

export const GetTodoParamsSchema = z.object({
  id: z.string(),
});

export const UpdateTodoParamsSchema = z.object({
  id: z.string(),
});

export const DeleteTodoParamsSchema = z.object({
  id: z.string(),
});

export const CreateTodoResponseSchema = TodoSchema;
export const UpdateTodoResponseSchema = TodoSchema;
export const DeleteTodoResponseSchema = z.object({
  message: z.string(),
});