import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db, runMigrations } from './db/index.js';
import { users } from './db/schema.js';
import { eq } from 'drizzle-orm';

const app = new Hono();

// Run migrations on startup
runMigrations().catch(err => {
  console.error('Migration failed:', err);
});
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

app.get('/status', (c) => {
  return c.json({ service: 'user-service', status: 'OK' });
});

app.post('/users/register', async (c) => {
  const { name, email, password } = await c.req.json();

  if (!name || !email || !password) {
    return c.json({ error: 'Missing fields' }, 400);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db.insert(users).values({
      name,
      email,
      password: hashedPassword
    }).returning({
      id: users.id,
      name: users.name,
      email: users.email
    });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET);
    return c.json({ token });
  } catch (err: any) {
    if (err.code === '23505') {
      return c.json({ error: 'Email already exists' }, 409);
    }
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

app.post('/users/login', async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: 'Missing fields' }, 400);
  }

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET);
    return c.json({ token });
  } catch (err) {
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

app.get('/users/me', async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return c.json(decoded);
  } catch (err) {
    return c.json({ error: 'Invalid token' }, 401);
  }
});

const port = Number(process.env.PORT) || 8001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
