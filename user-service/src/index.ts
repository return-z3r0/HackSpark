import { Hono } from 'hono';
const app = new Hono();

app.get('/status', (c) => {
  return c.json({ service: 'user-service', status: 'OK' });
});

export default {
  port: process.env.PORT || 8001,
  hostname: "0.0.0.0",
  fetch: app.fetch,
};