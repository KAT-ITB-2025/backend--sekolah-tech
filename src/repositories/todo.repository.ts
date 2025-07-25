import { eq } from 'drizzle-orm';
import type { z } from 'zod';
import type { Database } from '~/db/drizzle';
import { first } from '~/db/helper';
import { todo } from '~/db/schema/todo.schema';
import type { 
  GetTodoListQuerySchema, 
  CreateTodoBodySchema, 
  UpdateTodoBodySchema 
} from '~/types/todo.type';

export const getTodoList = async (
  db: Database,
  query: z.infer<typeof GetTodoListQuerySchema>,
) => {
  if (query.isCompleted === undefined) {
    return db.select().from(todo);
  }
  
  const isCompleted = query.isCompleted === 'true' ? true : false;
  return db.select().from(todo).where(eq(todo.isCompleted, isCompleted));
};

export const getTodoById = async (db: Database, id: string) => {
  return db.select().from(todo).where(eq(todo.id, id)).then(first);
};

export const createTodo = async (
  db: Database,
  data: z.infer<typeof CreateTodoBodySchema>,
) => {
  
  if (!data) {
    throw new Error('No data provided to createTodo');
  }
  
  if (!data.title) {
    throw new Error('Title is required');
  }
  
  const todoData = {
    title: data.title,
    description: data.description || null,
    isCompleted: false,
  };
  
  try {
    const [newTodo] = await db.insert(todo).values(todoData).returning();
    console.log('Successfully created todo:', newTodo);
    return newTodo;
  } catch (dbError) {
    console.error('Database error:', dbError);
    throw new Error(`Database error: ${dbError.message}`);
  }
};

export const updateTodoById = async (
  db: Database,
  id: string,
  data: z.infer<typeof UpdateTodoBodySchema>,
) => {

  if (!id || typeof id !== 'string') {
    throw new Error('Valid ID is required');
  }
  
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Valid data object is required');
  }
  
  const existingTodo = await getTodoById(db, id);
  if (!existingTodo) {
    return null;
  }

  const updateData: any = {};
  
  if (data.title !== undefined && data.title !== null) {
    updateData.title = data.title;
  }

  if (data.description !== undefined && data.description !== null) {
    updateData.description = data.description;
  }
  
  if (data.isCompleted !== undefined && data.isCompleted !== null) {
    updateData.isCompleted = data.isCompleted;
  }
  

  if (Object.keys(updateData).length === 0) {
    console.log('No updates to apply (all values were null/undefined)');
    return existingTodo;
  }

  updateData.updatedAt = new Date();

  try {
    const [updatedTodo] = await db
      .update(todo)
      .set(updateData)
      .where(eq(todo.id, id))
      .returning();
      
    console.log('Successfully updated todo:', updatedTodo);
    return updatedTodo;
  } catch (dbError) {
    console.error('Database error:', dbError);
    throw new Error(`Database update failed: ${dbError.message}`);
  }
};

export const deleteTodoById = async (db: Database, id: string) => {
  const existingTodo = await getTodoById(db, id);

  if (!existingTodo) {
    return null;
  }

  await db.delete(todo).where(eq(todo.id, id));
  return true;
};