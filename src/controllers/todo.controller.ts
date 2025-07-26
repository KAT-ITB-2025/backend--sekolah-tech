import { todo } from 'node:test';
import { db } from '~/db/drizzle';
import { getTodoById, getTodoList, createTodo, updateTodo, deleteTodo } from '~/repositories/todo.repository';
import { getTodoListRoute, getTodoRoute, createTodoRoute, updateTodoRoute, deleteTodoRoute } from '~/routes/todo.route';
import { createRouter } from '~/utils/router-factory';

export const todoRouter = createRouter();

// GET /api/todo
todoRouter.openapi(getTodoListRoute, async (c) => {
  const q = c.req.valid('query');
  const todos = await getTodoList(db, q);

  return c.json(todos, 200);
});

// GET /api/todo/{id}
todoRouter.openapi(getTodoRoute, async (c) => {
  const { id } = c.req.valid('param');
  const todo = await getTodoById(db, id);

  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  return c.json(todo, 200);
});

// POST /api/todo
todoRouter.openapi(createTodoRoute, async (c) => {
  const body = c.req.valid('json');
  const newTodo = await createTodo(db, body);

  return c.json(newTodo, 201);
});

// PATCH /api/todo/{id}
todoRouter.openapi(updateTodoRoute, async (c) => {
  const { id } = c.req.valid('param');
  const body = c.req.valid('json');
  
  const existingTodo = await getTodoById(db, id);
  if (!existingTodo) {
    return c.json({ error: 'Todo not found' }, 404);
  }
  
  const updatedTodo = await updateTodo(db, id, body);
  if (!updatedTodo) {
    return c.json({ error: 'Failed to update todo' }, 500);
  }
  
  return c.json(updatedTodo, 200);
});

// DELETE /api/todo/{id}
todoRouter.openapi(deleteTodoRoute, async (c) => {
  const { id } = c.req.valid('param');

  const existingTodo = await getTodoById(db, id);
  if (!existingTodo) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  const deletedTodo = await deleteTodo(db, id);
  if (!deletedTodo) {
    return c.json({ error: 'Failed to delete todo' }, 500);
  }

  return c.body(null, 204);
});