"use client"

import { useState } from "react"
import { ArrowLeft, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { useCart } from "~/context/cart-context"
import { ensure, jnavigate } from "~/lib/utils"
import { Link } from "@remix-run/react"
import Wrapper from "~/layouts/Wrapper"
import { useAuth } from "~/context/auth-context"

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const { isLoggedIn } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)

  const shipping = subtotal >= 50 ? 0 : 5.99
  const total = subtotal + shipping

  const handleCheckout = () => {
    setIsProcessing(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsProcessing(false)
      const destination = isLoggedIn ? "/checkout" : "/login?redirect=/checkout"
      jnavigate({
        path: destination,
      })
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <Wrapper>
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="px-6">
                <CardTitle>Items ({itemCount})</CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 py-4 border-b last:border-0">
                      <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link to={`/products/${item.productId}`} className="font-medium hover:underline line-clamp-2">
                          {item.name}
                        </Link>
                        <div className="text-sm text-muted-foreground mt-1">
                          {item.brandName && <span>{item.brandName} • </span>}
                          <span>{item.packageDescription}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">${ensure.number(item.price).toFixed(2)} each</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 mt-auto text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-6 flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && <div className="text-xs text-muted-foreground">Free shipping on orders over $50</div>}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCheckout} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
