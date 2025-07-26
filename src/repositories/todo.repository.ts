import { eq } from 'drizzle-orm';
import type z from 'zod';
import type { Database } from '~/db/drizzle';
import { first } from '~/db/helper';
import { todo } from '~/db/schema/todo.schema';
import type { GetTodoListQueryScema, CreateTodoBodySchema } from '~/types/todo.type';

export const getTodoList = async (
  db: Database,
  q: z.infer<typeof GetTodoListQueryScema>,
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
  data: z.infer<typeof CreateTodoBodySchema>,
) => {
  const [newTodo] = await db
    .insert(todo)
    .values({
      title: data.title,
      description: data.description,
      isCompleted: false,
    })
    .returning();

  return newTodo;
};

export const deleteTodoById = async (db: Database, id: string) => {
  const [deletedTodo] = await db
    .delete(todo)
    .where(eq(todo.id, id))
    .returning();

  return deletedTodo;
};