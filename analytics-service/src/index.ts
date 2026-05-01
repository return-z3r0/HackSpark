import { Hono } from 'hono';
const app = new Hono();

app.get('/status', (c) => {
  return c.json({ service: 'analytics-service', status: 'OK' });
});

export default {
  port: process.env.PORT || 8003,
  hostname: "0.0.0.0",
  fetch: app.fetch,
};