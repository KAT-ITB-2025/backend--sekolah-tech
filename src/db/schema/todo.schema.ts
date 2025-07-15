import { type InferSelectModel, relations, sql } from 'drizzle-orm';
import {
  type AnyPgColumn,
  boolean,
  index,
  integer,
  json,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';

import { createId, getNow } from '../../utils/drizzle-schema-util';

export const todo = pgTable('todo', {
  id: text('id').primaryKey().$defaultFn(createId),
  title: text('title').notNull(),
  description: text('description'),
  isCompleted: boolean('is_completed').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export type Todo = InferSelectModel<typeof todo>;
