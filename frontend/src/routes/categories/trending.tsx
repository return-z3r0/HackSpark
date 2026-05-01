import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Checkbox } from '#/components/ui/checkbox'
import { Label } from '#/components/ui/label'
import { z } from 'zod'

const trendingSearchSchema = z.object({
  available: z.boolean().default(false),
})

export const Route = createFileRoute('/categories/trending')({
  validateSearch: trendingSearchSchema,
  component: TrendingComponent,
})

const MOCK_PHOTOS = [
  {
    id: 1,
    title: 'Sony A7IV',
    category: 'Photography',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop',
    availability: true,
  },
  {
    id: 2,
    title: 'Mountain Bike',
    category: 'Outdoor Gear',
    url: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&h=400&fit=crop',
    availability: false,
  },
  {
    id: 3,
    title: 'DJI Mavic Pro',
    category: 'Drones',
    url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop',
    availability: true,
  },
  {
    id: 4,
    title: 'Fender Stratocaster',
    category: 'Musical Instruments',
    url: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=600&h=400&fit=crop',
    availability: false,
  },
  {
    id: 5,
    title: 'Camping Tent',
    category: 'Camping',
    url: 'https://images.unsplash.com/photo-1504280390224-1188372691b0?w=600&h=400&fit=crop',
    availability: true,
  },
  {
    id: 6,
    title: 'Power Drill',
    category: 'Power Tools',
    url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop',
    availability: true,
  },
]

function TrendingComponent() {
  const { available } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  // Logic: If checked (true), show only available. If unchecked (false), show all.
  const filteredPhotos = available
    ? MOCK_PHOTOS.filter((photo) => photo.availability)
    : MOCK_PHOTOS

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trending Items</h1>
          <p className="text-muted-foreground mt-2">
            Discover the most popular rentals on RentPi right now.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-muted/50 px-3 py-2 rounded-lg border border-border shadow-sm">
          <Checkbox
            id="trending-available-filter"
            checked={available}
            onCheckedChange={(checked) => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  available: checked === true,
                }),
              })
            }}
          />
          <Label
            htmlFor="trending-available-filter"
            className="text-xs font-medium cursor-pointer select-none"
          >
            Available only
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <Card
            key={photo.id}
            className="overflow-hidden group cursor-pointer border-border/50 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <Badge
                  variant="secondary"
                  className="bg-background/90 backdrop-blur-xs font-semibold"
                >
                  {photo.category}
                </Badge>
              </div>
              {!photo.availability && (
                <div className="absolute top-3 right-3">
                  <Badge variant="destructive" className="font-semibold">
                    Rented Out
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-foreground leading-tight">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {photo.availability ? 'Available today' : 'Currently unavailable'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No available items found.</p>
        </div>
      )}
    </div>
  )
}

