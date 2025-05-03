import { useState, useEffect } from "react"

export function useProductImages(productImages: {
  imageId: number;
  imageUrl: string;
  altText: string | null;
  isThumbnail: boolean;
  displayOrder: number;
}[]) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [images, setImages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchImages() {
      try {
        const sortedImages = productImages.sort((a, b) => a.displayOrder - b.displayOrder)
        setImages(sortedImages)
      } catch (error) {
        console.error("Error fetching product images:", error)
        setImages([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [productImages])

  return { images, isLoading }
}
