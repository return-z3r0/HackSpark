import { Link } from '@tanstack/react-router'
import { buttonVariants } from '#/components/ui/button'
import { Sparkles, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#/components/ui/sheet'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Catalog', to: '#' },
  { label: 'Categories', to: '/categories' },
  { label: 'About', to: '#' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              RentPi
            </span>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User & CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/signin"
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className={buttonVariants({ variant: 'default', size: 'sm' })}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu (Hamburger) */}
          <div className="md:hidden flex items-center gap-4">
            <Sheet>
              <SheetTrigger className="p-2 -mr-2 text-foreground/80 hover:text-foreground transition-colors outline-none">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left mb-8 border-b border-border pb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-sm">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    RentPi
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-3 mt-8">
                    <Link
                      to="/signin"
                      className={buttonVariants({
                        variant: 'outline',
                        className: 'w-full justify-center text-lg h-12',
                      })}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className={buttonVariants({
                        variant: 'default',
                        className: 'w-full justify-center text-lg h-12',
                      })}
                    >
                      Sign Up
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
