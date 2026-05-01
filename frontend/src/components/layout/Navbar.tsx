import { Link } from '@tanstack/react-router'
import { buttonVariants } from '#/components/ui/button'
import { Sparkles } from 'lucide-react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              RentPi
            </span>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <a
              href="#"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Catalog
            </a>
            <Link
              to="/categories"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Categories
            </Link>
            <a
              href="#"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </a>
          </nav>

          {/* User & CTA */}
          <div className="flex items-center gap-4">
            <Link
              to="/signin"
              className={
                buttonVariants({ variant: 'outline' }) +
                'hidden sm:inline-flex text-sm'
              }
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className={
                buttonVariants({ variant: 'default' }) +
                'hidden sm:inline-flex text-sm'
              }
            >
              Sign Up
            </Link>
            {/* <Avatar className="w-8 h-8 cursor-pointer shadow-sm sm:hidden md:inline-flex">
              <AvatarFallback className="bg-muted text-foreground text-xs font-semibold">
                U
              </AvatarFallback>
            </Avatar> */}
          </div>
        </div>
      </div>
    </header>
  )
}
