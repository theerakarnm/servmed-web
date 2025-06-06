import { Search, ShoppingCart, Menu, User } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { Badge } from "~/components/ui/badge"
import { Link } from "@remix-run/react"
import { useCart } from "~/context/cart-context"
import { useAuth } from "~/context/auth-context"

export default function Header() {
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/" className="text-lg font-semibold">
                Home
              </Link>
              <Link to="/products" className="text-lg font-semibold">
                Products
              </Link>
              <Link to="/categories" className="text-lg font-semibold">
                Categories
              </Link>
              <Link to="/brands" className="text-lg font-semibold">
                Brands
              </Link>
              <Link to="/about" className="text-lg font-semibold">
                About Us
              </Link>
              <Link to="/contact" className="text-lg font-semibold">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block text-xl">ServeMed</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/products" className="font-medium transition-colors hover:text-primary">
            Products
          </Link>
          <Link to="/categories" className="font-medium transition-colors hover:text-primary">
            Categories
          </Link>
          <Link to="/brands" className="font-medium transition-colors hover:text-primary">
            Brands
          </Link>
          <Link to="/about" className="font-medium transition-colors hover:text-primary">
            About Us
          </Link>
        </nav>

        <div className="flex items-center ml-auto gap-2">
          <form className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="w-full md:w-[200px] lg:w-[300px] pl-8" />
            </div>
          </form>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link to={isLoggedIn ? "/" : "/login"}>
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
