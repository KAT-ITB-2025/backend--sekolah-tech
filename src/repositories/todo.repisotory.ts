import { eq } from 'drizzle-orm';
import type z from 'zod';
import { object } from 'zod';
import type { Database } from '~/db/drizzle';
import { first } from '~/db/helper';
import { todo } from '~/db/schema/todo.schema';
import type { 
    GetTodoListQueryScema,
    PostTodoBodySchema,
    UpdateTodoBodySchema,
 } from '~/types/todo.type';

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

export const postTodo = async (
  db: Database,
  q: z.infer<typeof PostTodoBodySchema>,
) => {

    const newTodo = await db.insert(todo).values(q).returning();
    return newTodo[0];
};

export const updateTodo = async (
  db: Database,
  id: string,
  q: z.infer<typeof PostTodoBodySchema>,
) => {
  return db
    .update(todo)
    .set(q)
    .where(eq(todo.id, id))
    .returning()
    .then(first);
};

export const updateTodoById = async (
  db: Database, 
  id: string, 
  updates: z.infer<typeof UpdateTodoBodySchema>,
) => { 

    if (!updates || typeof updates !== 'object') {
        throw new Error('Invalid updates provided');
    }

    const checkTodo = await getTodoById(db, id);
    if (!checkTodo) {
        throw new Error('Todo not found');
    }

    try {
        const updateData: any = {};

        if (updates.title !== undefined && updates.title !== null) {
            updateData.title = updates.title;
        }

        if (updates.description !== undefined && updates.description !== null) {
            updateData.description = updates.description;
        }

        if (updates.isCompleted !== undefined && updates.isCompleted !== null) {
            updateData.isCompleted = updates.isCompleted;
        }

        if (Object.keys(updateData).length === 0) {
            return('No valid fields to update');
        }

        updateData.updatedAt = new Date();

         const result = await db
            .update(todo)
            .set(updateData)
            .where(eq(todo.id, id))
            .returning();

        return result[0];

    } catch (error) {
        console.error('Error in updateTodoById:', error);   
    }
};

export const deleteTodoById = async (
    db: Database, 
    id: string
) => {
  try{
    const deleted = await db
        .delete(todo)
        .where(eq(todo.id, id))
        .returning();
        return true;
  } catch (error) {
    console.error('Error in deleteTodoById:', error);
    }
}