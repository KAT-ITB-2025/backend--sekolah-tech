import { db } from './drizzle.js';
import { todo } from './schema/todo.schema.js';

const sampleTodos = [
  {
    title: 'Complete project documentation',
    description:
      'Write comprehensive documentation for the backend API project',
    isCompleted: false,
  },
  {
    title: 'Fix authentication bug',
    description:
      'Resolve the JWT token validation issue in the auth middleware',
    isCompleted: true,
  },
  {
    title: 'Add unit tests',
    description: 'Write unit tests for all controller methods',
    isCompleted: false,
  },
  {
    title: 'Deploy to staging',
    description: 'Deploy the application to staging environment for testing',
    isCompleted: false,
  },
  {
    title: 'Code review',
    description: 'Review pull requests from team members',
    isCompleted: true,
  },
  {
    title: 'Database optimization',
    description: 'Optimize database queries for better performance',
    isCompleted: false,
  },
  {
    title: 'Setup monitoring',
    description: 'Configure application monitoring and logging',
    isCompleted: false,
  },
  {
    title: 'Update dependencies',
    description: 'Update all npm packages to latest stable versions',
    isCompleted: true,
  },
];

export async function seedTodos() {
  try {
    console.log('🌱 Starting todo seeding...');

    // Test database connection first
    console.log('🔌 Testing database connection...');

    // Clear existing todos
    await db.delete(todo);
    console.log('🗑️  Cleared existing todos');

    // Insert sample todos
    const insertedTodos = await db.insert(todo).values(sampleTodos).returning();
    return insertedTodos;
  } catch (error) {
    console.error('❌ Error seeding todos:', error);
    console.error('💡 Make sure:');
    console.error('   - Your database is running (docker-compose up -d)');
    console.error(
      '   - You have run migrations (bun db:push or bun db:migrate)',
    );
    console.error('   - Your DATABASE_URL is correct in .env');
    throw error;
  }
}

// Always run the seeder when this file is executed
console.log('🚀 Running database seeder...');
seedTodos()
  .then(() => {
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
