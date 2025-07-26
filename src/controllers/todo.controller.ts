import { db } from '~/db/drizzle';
import { getTodoById, getTodoList, postTodo, patchTodoById, deleteTodoById } from '~/repositories/todo.repository';
import { getTodoListRoute, getTodoRoute, patchTodoRoute, postTodoRoute, deleteTodoRoute } from '~/routes/todo.route';
import { createRouter } from '~/utils/router-factory';

export const todoRouter = createRouter();

todoRouter.openapi(getTodoListRoute, async (c) => {
  const query = c.req.valid('query');
  const todos = await getTodoList(db, query);

  return c.json(todos, 200);
});

todoRouter.openapi(getTodoRoute, async (c) => {
  const params = c.req.valid('param');
  const todo = await getTodoById(db, params);

  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  return c.json(todo, 200);
});

todoRouter.openapi(postTodoRoute, async (c) => {
  const body = c.req.valid('json');
  const newTodo = await postTodo(db, body);

  return c.json(newTodo, 201);
});

todoRouter.openapi(patchTodoRoute, async (c) => {
  const id = c.req.param('id');
  const body = c.req.valid('json');
  
  const updatedTodo = await patchTodoById(db, id, body);

  if (!updatedTodo) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  return c.json(updatedTodo, 200);
});

todoRouter.openapi(deleteTodoRoute, async (c) => {
  const id = c.req.param('id');
  const deleted = await deleteTodoById(db, { id });

  if (!deleted) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  return c.json(
    {
      message: 'Todo deleted successfully',
      data: deleted
    },
    200
  );
});

