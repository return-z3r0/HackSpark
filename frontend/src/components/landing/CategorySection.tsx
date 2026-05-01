import { MOCK_USER_PREFS } from '#/db/mockdata'
import { Card, CardContent } from '#/components/ui/card'
import { ArrowUpRight } from 'lucide-react'

export function CategorySection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Popular Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the most sought-after rental categories. Find exactly what you need for your next project or adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {MOCK_USER_PREFS.map((category) => (
            <Card 
              key={category.category} 
              className="group overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 cursor-pointer relative"
            >
              {/* Decorative background blur */}
              <div 
                className="absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: category.color }}
              />
              
              <CardContent className="p-6 relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                <div className="flex justify-between items-start">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-foreground" />
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-foreground mb-1 capitalize">
                    {category.category.toLowerCase()}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {category.rentalCount} active rentals
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
