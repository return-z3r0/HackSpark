import { Hono } from 'hono';

const app = new Hono();

app.get('/status', async (c) => {
  const services = {
    'user-service': process.env.USER_SERVICE_URL || 'http://user-service:8001',
    'rental-service': process.env.RENTAL_SERVICE_URL || 'http://rental-service:8002',
    'analytics-service': process.env.ANALYTICS_SERVICE_URL || 'http://analytics-service:8003',
    'agentic-service': process.env.AGENTIC_SERVICE_URL || 'http://agentic-service:8004'
  };

  const downstream: Record<string, string> = {};

  const fetchService = async (name: string, url: string) => {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000); // 2s timeout
      const res = await fetch(`${url}/status`, { signal: controller.signal });
      clearTimeout(id);

      if (!res.ok) {
        downstream[name] = 'UNREACHABLE';
        return;
      }

      const data: any = await res.json();
      if (data && data.status === 'OK') {
        downstream[name] = 'OK';
      } else {
        downstream[name] = 'UNREACHABLE';
      }
    } catch (err) {
      downstream[name] = 'UNREACHABLE';
    }
  };

  await Promise.all(
    Object.entries(services).map(([name, url]) => fetchService(name, url as string))
  );

  return c.json({
    service: 'api-gateway',
    status: 'OK',
    downstream
  });
});

import { serve } from '@hono/node-server';

const port = Number(process.env.PORT) || 8000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});