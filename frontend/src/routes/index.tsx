import { createFileRoute } from '@tanstack/react-router'

import { Navbar } from '#/components/layout/Navbar'
import { Footer } from '#/components/layout/Footer'
import { HeroSection } from '#/components/landing/HeroSection'
import { ProductSlider } from '#/components/landing/ProductSlider'
import { CategorySection } from '#/components/landing/CategorySection'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <ProductSlider />
        <CategorySection />
      </main>
      <Footer />
    </div>
  )
}
