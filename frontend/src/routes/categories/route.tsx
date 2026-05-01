import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from '#/components/ui/sidebar'
import { AppSidebar } from '#/components/layout/AppSidebar'
import { Navbar } from '#/components/layout/Navbar'

export const Route = createFileRoute('/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden w-full relative">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 lg:p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <h1 className="font-semibold text-lg md:hidden">
                    Categories
                  </h1>
                </div>
              </div>
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
