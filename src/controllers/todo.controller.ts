import { db } from '~/db/drizzle';
import { 
  getTodoList, 
  getTodoById, 
  createTodo, 
  updateTodoById, 
  deleteTodoById 
} from '~/repositories/todo.repository';
import { 
  getTodoListRoute, 
  getTodoRoute, 
  createTodoRoute, 
  updateTodoRoute, 
  deleteTodoRoute 
} from '~/routes/todo.route';
import { createRouter } from '~/utils/router-factory';

export const todoRouter = createRouter();

todoRouter.openapi(getTodoListRoute, async (c) => {
  try {
    const query = c.req.valid('query');
    const todos = await getTodoList(db, query);
    return c.json(todos, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

todoRouter.openapi(getTodoRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const todo = await getTodoById(db, id);
    
    if (!todo) {
      return c.json({ error: 'Todo not found' }, 404);
    }
    
    return c.json(todo, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

todoRouter.openapi(createTodoRoute, async (c) => {
  try {
    const rawBody = await c.req.text();
    
    let parsedBody;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch (parseError) {
      console.log('JSON parse error:', parseError);
      return c.json({ error: 'Invalid JSON format' }, 400);
    }
    
    let validatedBody;
    try {
      validatedBody = c.req.valid('json');
    } catch (validationError) {
      console.log('Hono validation error:', validationError);
      validatedBody = parsedBody;
    }
    
    const bodyToUse = validatedBody || parsedBody;
    
    if (!bodyToUse || !bodyToUse.title) {
      return c.json({ error: 'Title is required' }, 400);
    }
    
    const newTodo = await createTodo(db, bodyToUse);
    console.log('Created todo:', newTodo);
    return c.json(newTodo, 201);
  } catch (error) {
    console.error('Create todo error:', error);
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

todoRouter.openapi(updateTodoRoute, async (c) => {
  try {
    let params;
    try {
      params = c.req.valid('param');
      console.log('Route params:', params);
    } catch (paramError) {
      console.log('Param validation error:', paramError);
      return c.json({ error: 'Invalid route parameters' }, 400);
    }
    
    const { id } = params;
    console.log('Extracted ID:', id);
    
    if (!id) {
      console.log('No ID provided');
      return c.json({ error: 'Todo ID is required' }, 400);
    }
    
    let body;
    try {
      const rawBody = await c.req.text();
      console.log('Raw request body:', rawBody);
      
      if (!rawBody || rawBody.trim() === '') {
        console.log('Empty request body');
        return c.json({ error: 'Request body is required' }, 400);
      }
      
      body = JSON.parse(rawBody);
      console.log('Parsed body:', body);
      console.log('Body type:', typeof body);
      console.log('Body keys:', body ? Object.keys(body) : 'body is null');
      
    } catch (bodyError) {
      console.log('Body parsing error:', bodyError);
      return c.json({ error: 'Invalid JSON in request body' }, 400);
    }
    
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      console.log('Invalid body type:', typeof body);
      return c.json({ error: 'Request body must be an object' }, 400);
    }
    
    console.log('Calling updateTodoById with:', { id, body });
    const updatedTodo = await updateTodoById(db, id, body);
    console.log('Update result:', updatedTodo);
    
    if (!updatedTodo) {
      console.log('Todo not found for ID:', id);
      return c.json({ error: 'Todo not found' }, 404);
    }
    
    console.log('Successfully updated todo');
    return c.json(updatedTodo, 200);
  } catch (error) {
    console.error('Update todo error:', error);
    console.error('Error stack:', error.stack);
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

todoRouter.openapi(deleteTodoRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    
    const deleted = await deleteTodoById(db, id);
    
    if (!deleted) {
      return c.json({ error: 'Todo not found' }, 404);
    }
    
    return c.json({ message: 'Todo deleted successfully' }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});