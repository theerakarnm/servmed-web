import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

export type CartItem = {
  productId: number
  variantId: number
  name: string
  brandName?: string
  packageDescription: string
  price: number
  quantity: number
  imageUrl?: string
}

type CartContextType = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addItem: (item: CartItem) => void
  updateQuantity: (variantId: number, quantity: number) => void
  removeItem: (variantId: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart")
      if (storedCart) {
        try {
          return JSON.parse(storedCart)
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error)
          localStorage.removeItem("cart")
        }
      }
    }
    return []
  })

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex((item) => item.variantId === newItem.variantId)

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity

        toast(`Updated quantity of ${newItem.name} (${newItem.packageDescription})`)

        return updatedItems
      } else {
        // Add new item if it doesn't exist
        toast(`${newItem.name} (${newItem.packageDescription}) added to your cart`)

        return [...prevItems, newItem]
      }
    })
  }

  const updateQuantity = (variantId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId)
      return
    }

    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.variantId === variantId) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }

  const removeItem = (variantId: number) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.variantId === variantId)

      if (itemToRemove) {
        toast(`${itemToRemove.name} (${itemToRemove.packageDescription}) removed from your cart`)
      }

      return prevItems.filter((item) => item.variantId !== variantId)
    })
  }

  const clearCart = () => {
    setItems([])
    toast("All items have been removed from your cart")
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
