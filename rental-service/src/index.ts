import { Hono } from 'hono';
const app = new Hono();

app.get('/status', (c) => {
  return c.json({ service: 'rental-service', status: 'OK' });
});

export default {
  port: process.env.PORT || 8002,
  hostname: "0.0.0.0",
  fetch: app.fetch,
};