import { eq } from 'drizzle-orm';
import type z from 'zod';
import type { Database } from '~/db/drizzle';
import { first } from '~/db/helper';
import { todo } from '~/db/schema/todo.schema';
import type { GetTodoListQuerySchema, CreateTodoSchema, UpdateTodoSchema } from '~/types/todo.type';
import { createId, getNow } from '~/utils/drizzle-schema-util';

export const getTodoList = async (
  db: Database,
  q: z.infer<typeof GetTodoListQuerySchema>,
) => {
  if (q.isCompleted === undefined) {
    return db.select().from(todo);
  }

  const isCompleted =
    q.isCompleted === 'true'
      ? eq(todo.isCompleted, true)
      : eq(todo.isCompleted, false);

  return db.select().from(todo).where(isCompleted);
};

export const getTodoById = async (db: Database, id: string) => {
  return db.select().from(todo).where(eq(todo.id, id)).then(first);
};

export const createTodo = async (
  db: Database,
  body: z.infer<typeof CreateTodoSchema>,
) => {
  const newTodo = {
    id: createId(),
    title: body.title,
    description: body.description || '',
    isCompleted: false,
    createdAt: getNow(),
    updatedAt: getNow(),
  };

  return db.insert(todo).values(newTodo).returning().then(first);
};

export const updateTodo = async (
  db: Database,
  id: string,
  body: z.infer<typeof UpdateTodoSchema>,
) => {
  const updateData: Partial<{
    title: string;
    description: string;
    isCompleted: boolean;
    updatedAt: Date;
  }> = {
    updatedAt: getNow(),
  };

  if (body.title !== null && body.title !== undefined) {
    updateData.title = body.title;
  }
  if (body.description !== null && body.description !== undefined) {
    updateData.description = body.description;
  }
  if (body.isCompleted !== null && body.isCompleted !== undefined) {
    updateData.isCompleted = body.isCompleted;
  }

  return db
    .update(todo)
    .set(updateData)
    .where(eq(todo.id, id))
    .returning()
    .then(first);
};

export const deleteTodo = async (db: Database, id: string) => {
  return db
    .delete(todo)
    .where(eq(todo.id, id))
    .returning()
    .then(first);
};