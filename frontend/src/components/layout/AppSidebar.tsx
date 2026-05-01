import { useState } from 'react'
import { MOCK_ALL_CATEGORIES } from '#/db/mockdata'
import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '#/components/ui/sidebar'
import { Sparkles, Filter, ChevronDown, ChevronUp } from 'lucide-react'

export function AppSidebar() {
  const [showAll, setShowAll] = useState(false)
  const displayCount = showAll ? MOCK_ALL_CATEGORIES.length : 10
  const displayedCategories = MOCK_ALL_CATEGORIES.slice(0, displayCount)

  return (
    <Sidebar variant="inset" className="border-r border-border bg-background">
      <SidebarHeader className="border-b border-border p-4">
        <Link to="/" className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="font-bold tracking-tight">RentPi Categories</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Filters */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </SidebarGroupLabel>
        </SidebarGroup>

        {/* Categories */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {displayedCategories.map((category) => (
                <SidebarMenuItem key={category}>
                  <SidebarMenuButton>
                    <Link
                      to={`/categories/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      activeProps={{
                        className:
                          'bg-muted font-semibold text-violet-600 dark:text-violet-400',
                      }}
                    >
                      {category}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <div className="px-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full flex justify-between items-center text-xs text-muted-foreground"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll
                  ? 'Show Less'
                  : `Show ${MOCK_ALL_CATEGORIES.length - 10} More`}
                {showAll ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
