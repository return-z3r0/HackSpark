import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = new Hono();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://rentpi:localpassword@postgres:5432/rentpi_local'
});

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Initialize database
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized');
  } catch (err) {
    console.error('Failed to initialize database', err);
  }
};

initDb();

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
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const user = result.rows[0];
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
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

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
