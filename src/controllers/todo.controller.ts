import { db } from '~/db/drizzle';
import { createTodo, deleteTodoById, getTodoById, getTodoList } from '~/repositories/todo.repository';
import { createTodoRoute, deleteTodoRoute, getTodoListRoute, getTodoRoute } from '~/routes/todo.route';
import { createRouter } from '~/utils/router-factory';

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

todoRouter.openapi(createTodoRoute, async (c) => {
  const body = c.req.valid('json');
  const newTodo = await createTodo(db, body);

  return c.json(newTodo, 201);
});

todoRouter.openapi(deleteTodoRoute, async (c) => {
  const { id } = c.req.valid('param');
  const deletedTodo = await deleteTodoById(db, id);

  if (!deletedTodo) {
    return c.json({ message: 'Todo not found' }, 404);
  }

  return c.json({ message: 'Todo deleted successfully' }, 200);
});