import { eq } from 'drizzle-orm';
import { get } from 'http';
import type z from 'zod';
import type { Database } from '~/db/drizzle';
import { first } from '~/db/helper';
import { todo } from '~/db/schema/todo.schema';
import type {
  GetTodoListQuerySchema,
  GetTodoParamsSchema,
  PostTodoSchema,
  PatchTodoParamsSchema,
  DeleteTodoParamsSchema,
} from '~/types/todo.type';

export const getTodoList = async (
  db: Database,
  q: z.infer<typeof GetTodoListQuerySchema>,
) => {
  if (q.isCompleted == undefined) {
    return await db.select().from(todo);
  }

  const isCompleted =
    q.isCompleted === 'true'
      ? eq(todo.isCompleted, true)
      : eq(todo.isCompleted, false);
  return await db.select().from(todo).where(isCompleted);
};

export const getTodoById = async (
  db: Database,
  q: z.infer<typeof GetTodoParamsSchema>,
) => {
  const todoId = q.id;

  return await db.select().from(todo).where(eq(todo.id, todoId)).then(first);
};

export const postTodo = async (
  db: Database,
  q: z.infer<typeof PostTodoSchema>,
) => {
  const { title, description } = q;
  return await db.insert(todo).values({
    title,
    description,
    isCompleted: false,
  }).returning();
};

export const patchTodoById = async (
  db: Database,
  id: string,
  q: z.infer<typeof PatchTodoParamsSchema>,
) => {
  const filtered = Object.fromEntries(
    Object.entries(q).filter(([_, value]) => value !== undefined && value !== null),
  );

  const todoExists = await getTodoById(db, { id });
  if (!todoExists) {
    return null;
  }

  if (Object.keys(filtered).length === 0) {
    return todoExists;
  }

  return await db
    .update(todo)
    .set({
      ...filtered
    })
    .where(eq(todo.id, id))
    .returning();
};

export const deleteTodoById = async (
  db: Database,
  q: z.infer<typeof DeleteTodoParamsSchema>,
) => {
  const todoId = q.id;

  const todoExists = await getTodoById(db, { id: todoId });
  if (!todoExists) {
    return null;
  }

  const [deleted] = await db
    .delete(todo)
    .where(eq(todo.id, todoId))
    .returning();

  return deleted;
};
