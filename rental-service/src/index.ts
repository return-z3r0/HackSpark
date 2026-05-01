import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

const CENTRAL_API_URL = process.env.CENTRAL_API_URL || 'https://technocracy.brittoo.xyz';
const CENTRAL_API_TOKEN = process.env.CENTRAL_API_TOKEN;

app.get('/status', (c) => {
  return c.json({ service: 'rental-service', status: 'OK' });
});

const proxyRequest = async (path: string, query: string) => {
  const url = `${CENTRAL_API_URL}${path}${query ? '?' + query : ''}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${CENTRAL_API_TOKEN}`
    }
  });

  return response;
};

app.get('/rentals/products', async (c) => {
  try {
    const query = new URLSearchParams(c.req.query()).toString();
    const response = await proxyRequest('/api/data/products', query);

    if (response.status === 429) {
        return c.json({ error: 'Rate limit exceeded' }, 429);
    }

    if (!response.ok) {
        return c.json({ error: 'Central API error' }, response.status as any);
    }

    const data = await response.json();
    return c.json(data);
  } catch (err) {
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

app.get('/rentals/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const response = await proxyRequest(`/api/data/products/${id}`, '');

    if (response.status === 404) {
        return c.json({ error: 'Product not found' }, 404);
    }

    if (response.status === 429) {
        return c.json({ error: 'Rate limit exceeded' }, 429);
    }

    if (!response.ok) {
        return c.json({ error: 'Central API error' }, response.status as any);
    }

    const data = await response.json();
    return c.json(data);
  } catch (err) {
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

const port = Number(process.env.PORT) || 8002;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
