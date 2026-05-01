import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/categories/')({
  loader: () => {
    throw redirect({
      to: '/categories/trending',
      search: {
        available: true,
      },
    })
  },
})
