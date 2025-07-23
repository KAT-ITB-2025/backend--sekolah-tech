import { db } from '~/db/drizzle';
import { getTodoById, getTodoList } from '~/repositories/todo.repository';
import { getTodoListRoute, getTodoRoute } from '~/routes/todo.route';
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
