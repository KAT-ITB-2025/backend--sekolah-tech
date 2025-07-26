import { db } from '~/db/drizzle';
import { getTodoById, getTodoList, postTodo, updateTodoById, deleteTodoById } from '~/repositories/todo.repisotory';
import { getTodoListRoute, getTodoRoute, postTodoRoute, updateTodoRoute, deleteTodoRoute } from '~/routes/todo.route';
import { createRouter } from '~/utils/router-factory';
import { PostTodoBodySchema } from '~/types/todo.type';
import { todo } from 'node:test';

export const todoRouter = createRouter();

todoRouter.openapi(getTodoListRoute, async (c) => {
  const q = c.req.valid('query');
  const todos = await getTodoList(db, q);

  return c.json(todos, 200);
});

todoRouter.openapi(getTodoRoute, async (c) => {
  const { id } = c.req.valid('param');
  const todo = await getTodoById(db, id);

  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  return c.json(todo, 200);
});

todoRouter.openapi(postTodoRoute, async (c) => {
 try{
  const q = c.req.valid('json');
  const safeParse = PostTodoBodySchema.safeParse(q);
  if (!safeParse.success) {
    return c.json({ error: safeParse.error.flatten() }, 400);
  }


  const newTodo = await postTodo(db, q);
  return c.json(newTodo, 201);
 } catch (error) {
    console.error('Error in postTodo controller:', error);
    return c.json({ error: 'Failed to create todo', info: error }, 500);
 }
});

todoRouter.openapi(updateTodoRoute, async (c) => {
    try {
        const { id } = c.req.valid('param');
        const q = c.req.valid('json');

        const todo = await getTodoById(db, id);
        if (!todo) {
            return c.json({ error: 'Todo not found' }, 404);
        }

        if (q.title !== null && q.title !== undefined) {
            if(q.title?.trim() === '') {
                return c.json({ error: 'Title cannot be empty' }, 400);
            }
        }

        const updatedTodo = await updateTodoById(db, id, q);
        return c.json(updatedTodo, 200);
    } catch (error) {
        console.error('Error in updateTodo controller:', error);
        return c.json({ error: 'Failed to update todo', info: error }, 500);
    }
});

todoRouter.openapi(deleteTodoRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const todo = await getTodoById(db, id);

    if (!todo) {
      return c.json({ error: 'Todo not found' }, 404);
    }

    const deleteTodo = await deleteTodoById(db, id);
    return c.json(deleteTodo, 200);
  } catch (error) {
    console.error('Error in deleteTodo controller:', error);
    return c.json({ error: 'Failed to delete todo', info: error }, 500);
  }
});