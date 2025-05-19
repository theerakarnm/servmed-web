export type Category = {
  categoryId: number
  name: string
  productCount?: number
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    return [
      { categoryId: 1, name: "Vitamins", productCount: 120 },
      { categoryId: 2, name: "Minerals", productCount: 85 },
      { categoryId: 3, name: "Probiotics", productCount: 64 },
      { categoryId: 4, name: "Omega-3", productCount: 42 },
      { categoryId: 5, name: "Protein", productCount: 78 },
      { categoryId: 6, name: "Herbs", productCount: 93 },
      { categoryId: 7, name: "Amino Acids", productCount: 55 },
      { categoryId: 8, name: "Antioxidants", productCount: 48 },
      { categoryId: 9, name: "Digestive Health", productCount: 32 },
      { categoryId: 10, name: "Immune Support", productCount: 67 },
    ]
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
