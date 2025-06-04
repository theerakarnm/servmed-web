import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle2, QrCode } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Separator } from "~/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import AddressForm, { type Address } from "~/components/features/checkout/address-form"
import { createAddress } from "~/services/addresses"
import ThaiQRPayment from "~/components/features/checkout/thai-qr-payment"
import { useCart } from "~/context/cart-context"
import { useAuth } from "~/context/auth-context"
import { jnavigate } from "~/lib/utils"
import { toast } from "sonner"
import { Link } from "@remix-run/react"
import Wrapper from "~/layouts/Wrapper"

type OrderStatus = "draft" | "pending_payment" | "processing" | "completed" | "cancelled"

type Order = {
  id: string
  items: any[]
  subtotal: number
  shipping: number
  total: number
  address: Address
  paymentMethod: string
  status: OrderStatus
  createdAt: string
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { isLoggedIn } = useAuth()

  const [paymentMethod, setPaymentMethod] = useState<string>("thai_qr")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [pendingPayment, setPendingPayment] = useState(false)
  const [order, setOrder] = useState<Order | null>(null)

  // Redirect to login if user is not authenticated
  // useEffect(() => {
  //   if (typeof window !== "undefined" && !isLoggedIn) {
  //     jnavigate({ path: "/login?redirect=/checkout" })
  //   }
  // }, [isLoggedIn])

  // Address management
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const shipping = subtotal >= 50 ? 0 : 5.99
  const total = subtotal + shipping

  // Load saved addresses from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAddresses = localStorage.getItem("addresses")
      if (savedAddresses) {
        try {
          const parsedAddresses = JSON.parse(savedAddresses) as Address[]
          setAddresses(parsedAddresses)

          // Set default address if available
          const defaultAddress = parsedAddresses.find((addr) => addr.isDefault)
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id)
          } else if (parsedAddresses.length > 0) {
            setSelectedAddressId(parsedAddresses[0].id)
          } else {
            setShowAddressForm(true)
          }
        } catch (error) {
          console.error("Failed to parse addresses from localStorage:", error)
        }
      } else {
        // No saved addresses, show the form
        setShowAddressForm(true)
      }
    }
  }, [])

  const saveAddress = async (address: Address) => {
    // If this is set as default, unset any other default
    let updatedAddresses = [...addresses]

    if (address.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === address.id,
      }))
    }

    // Add or update the address
    const existingIndex = updatedAddresses.findIndex((addr) => addr.id === address.id)
    if (existingIndex >= 0) {
      updatedAddresses[existingIndex] = address
    } else {
      updatedAddresses.push(address)
    }

    setAddresses(updatedAddresses)
    setSelectedAddressId(address.id)
    setShowAddressForm(false)
    setEditingAddress(null)

    if (isLoggedIn) {
      try {
        await createAddress(address)
      } catch (error) {
        console.error("Failed to save address via API:", error)
        toast("Failed to save address. Please try again.")
        return
      }
    } else if (typeof window !== "undefined") {
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses))
    }

    toast("Your shipping address has been saved successfully.")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAddressId && addresses.length > 0) {
      toast("Please select a shipping address to continue.")
      return
    }

    setIsSubmitting(true)

    // Create order object
    const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId)

    if (!selectedAddress) {
      toast("Please add a shipping address to continue.")
      setIsSubmitting(false)
      return
    }

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      items: [...items],
      subtotal,
      shipping,
      total,
      address: selectedAddress,
      paymentMethod,
      status: "draft",
      createdAt: new Date().toISOString(),
    }

    setOrder(newOrder)

    // For Thai QR payment, show the QR code
    if (paymentMethod === "thai_qr") {
      setPendingPayment(true)
      setIsSubmitting(false)
    } else {
      // For other payment methods, simulate processing
      setTimeout(() => {
        setIsSubmitting(false)
        setOrderComplete(true)
        clearCart()
      }, 2000)
    }
  }

  const handlePaymentConfirmed = () => {
    if (order) {
      // Update order status
      const updatedOrder = {
        ...order,
        status: "pending_payment" as OrderStatus,
      }
      setOrder(updatedOrder)

      // Save order to localStorage
      if (typeof window !== "undefined") {
        const savedOrders = localStorage.getItem("orders") || "[]"
        try {
          const orders = JSON.parse(savedOrders)
          orders.push({
            ...updatedOrder,
            shipping: undefined,
            subtotal: undefined,
            total: undefined,
            amountObject: {
              shipping: updatedOrder.shipping,
              subtotal: updatedOrder.subtotal,
              tax: 0,
              total: updatedOrder.total,
            },
          })
          localStorage.setItem("orders", JSON.stringify(orders))
        } catch (error) {
          console.error("Failed to save order to localStorage:", error)
        }
      }

      setPendingPayment(false)
      // Navigate to slip upload page
      jnavigate({
        path: "/upload-slip",
        query: new URLSearchParams({ orderId: updatedOrder.id }),
      })
      clearCart()
    }
  }

  if (orderComplete) {
    return (
      <Wrapper>
        <div className="container max-w-md mx-auto px-4 py-16 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">
            {order?.status === "pending_payment" ? "Payment Pending Verification" : "Order Confirmed!"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {order?.status === "pending_payment"
              ? "Thank you for your order. We're waiting for payment confirmation. You'll receive an email once your payment is verified."
              : "Thank you for your purchase. We've sent a confirmation email with your order details."}
          </p>
          <div className="text-sm text-muted-foreground mb-8">Order ID: {order?.id}</div>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </Wrapper>
    )
  }

  if (pendingPayment && order) {
    return (
      <Wrapper>
        <div className="container max-w-md mx-auto px-4 py-12">
          <ThaiQRPayment amount={order.total} onPaymentConfirmed={handlePaymentConfirmed} />
        </div>
      </Wrapper>
    )
  }

  // if (items.length === 0) {
  //   return (
  //     <Wrapper>
  //       <div className="container max-w-md mx-auto px-4 py-16 text-center">
  //         <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
  //         <p className="text-muted-foreground mb-8">You need to add items to your cart before checking out.</p>
  //         <Button asChild>
  //           <Link to="/products">Browse Products</Link>
  //         </Button>
  //       </div>
  //     </Wrapper>
  //   )
  // }

  return (
    <Wrapper>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                  <CardDescription>
                    {addresses.length > 0 && !showAddressForm ? (
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => {
                          setEditingAddress(null)
                          setShowAddressForm(true)
                        }}
                      >
                        + Add new address
                      </Button>
                    ) : null}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {showAddressForm ? (
                    <AddressForm
                      existingAddress={editingAddress ?? undefined}
                      onSave={saveAddress}
                      onCancel={addresses.length > 0 ? () => {
                        setShowAddressForm(false)
                        setEditingAddress(null)
                      } : undefined}
                    />
                  ) : addresses.length > 0 ? (
                    <RadioGroup
                      value={selectedAddressId || ""}
                      onValueChange={setSelectedAddressId}
                      className="space-y-3"
                    >
                      {addresses.map((address) => (
                        <div key={address.id} className="flex items-start space-x-2">
                          <RadioGroupItem value={address.id} id={`address-${address.id}`} className="mt-1" />
                          <div className="grid gap-1.5 leading-none w-full">
                            <Label
                              htmlFor={`address-${address.id}`}
                              className="flex justify-between w-full cursor-pointer"
                            >
                              <span>
                                {address.firstName} {address.lastName}
                                {address.isDefault && (
                                  <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                    Default
                                  </span>
                                )}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto py-0 px-2"
                                onClick={(e) => {
                                  e.preventDefault()
                                  const addrToEdit = addresses.find((a) => a.id === address.id)
                                  if (addrToEdit) {
                                    setEditingAddress(addrToEdit)
                                    setShowAddressForm(true)
                                  }
                                }}
                              >
                                Edit
                              </Button>
                            </Label>
                            <div className="text-sm text-muted-foreground">
                              <div>{address.address}</div>
                              <div>
                                {address.city}, {address.state} {address.postalCode}
                              </div>
                              <div>{address.country}</div>
                              <div>Phone: {address.phone}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : null}
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-1">
                      <TabsTrigger value="thai_qr">
                        <QrCode className="h-4 w-4 mr-2" />
                        Thai QR
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="thai_qr" className="pt-4">
                      <div className="text-center p-4 text-muted-foreground">
                        <p>You'll be shown a QR code to scan after placing your order.</p>
                        <p className="text-sm mt-2">Supported by all major Thai banks.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : `Complete Order • $${total.toFixed(2)}`}
              </Button>
            </form>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {items.length} {items.length === 1 ? "item" : "items"} in your cart
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.variantId} className="flex justify-between py-2">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.packageDescription} × {item.quantity}
                      </div>
                    </div>
                    <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
