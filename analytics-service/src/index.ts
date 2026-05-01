import { Hono } from 'hono';
const app = new Hono();

app.get('/status', (c) => {
  return c.json({ service: 'analytics-service', status: 'OK' });
});

import { serve } from '@hono/node-server';

const port = Number(process.env.PORT) || 8003;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});