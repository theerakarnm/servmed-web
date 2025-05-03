"use client"

import { useState, useEffect } from "react"
import { ProductVariants } from "~/services/products"

export function useProductVariants(productVariants: ProductVariants[]) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [variants, setVariants] = useState<ProductVariants[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchVariants() {
      try {
        setVariants(productVariants)
      } catch (error) {
        console.error("Error fetching product variants:", error)
        setVariants([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchVariants()
  }, [productVariants])

  return { variants, isLoading }
}
