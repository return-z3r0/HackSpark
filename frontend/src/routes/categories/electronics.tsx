import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/categories/electronics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/categories/electronics"!</div>
}
