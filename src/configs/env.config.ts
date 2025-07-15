import dotenv from 'dotenv';
import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().url(),
  ALLOWED_ORIGINS: z
    .string()
    .default('["http://localhost:3000"]')
    .transform((value) => JSON.parse(value))
    .pipe(z.array(z.string().url())),
});

dotenv.config({
  quiet: true,
});

const result = EnvSchema.safeParse(process.env);
if (!result.success) {
  console.error('Invalid environment variables: ');
  console.error(result.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = result.data;
