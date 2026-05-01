import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '#/components/ui/carousel'
import { Card, CardContent } from '#/components/ui/card'
import { MOCK_PRODUCT_LIST } from '#/db/mockdata'
import { Badge } from '#/components/ui/badge'
import { Star } from 'lucide-react'

export function ProductSlider() {
  // Duplicate mock data to demonstrate slider since there are only 2 items
  const duplicatedProducts = [
    ...MOCK_PRODUCT_LIST.data,
    ...MOCK_PRODUCT_LIST.data.map(p => ({ ...p, id: p.id + 100 })),
    ...MOCK_PRODUCT_LIST.data.map(p => ({ ...p, id: p.id + 200 })),
  ]

  return (
    <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Rentals</h2>
          <p className="text-muted-foreground">Discover top-rated products available right now.</p>
        </div>
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-4">
          {duplicatedProducts.map((product) => (
            <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <Card className="overflow-hidden border-border/50 hover:border-violet-500/30 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-xs font-semibold">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0 bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-500 px-1.5 py-0.5 rounded-md text-xs font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        {product.rating}
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-xl font-bold text-foreground">
                        ${product.pricePerDay.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">/ day</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-6">
          <CarouselPrevious className="static translate-y-0 w-10 h-10 border-border hover:bg-muted" />
          <CarouselNext className="static translate-y-0 w-10 h-10 border-border hover:bg-muted" />
        </div>
      </Carousel>
    </section>
  )
}
