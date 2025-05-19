import { useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useMemo, useState } from "react"

import CategoryCard from "~/components/category-card"
import { Input } from "~/components/ui/input"
import Wrapper from "~/layouts/Wrapper"
import { getAllCategories } from "~/data/category"

export async function loader({}: LoaderFunctionArgs) {
  const categories = await getAllCategories()
  return { categories }
}

export default function CategoriesPage() {
  const { categories } = useLoaderData<typeof loader>()
  const [query, setQuery] = useState("")

  const filtered = useMemo(
    () =>
      categories.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      ),
    [categories, query]
  )

  return (
    <Wrapper>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Categories</h1>
          <Input
            type="search"
            placeholder="Search categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        {filtered.length === 0 ? (
          <p className="text-muted-foreground">No categories found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filtered.map((category) => (
              <CategoryCard key={category.categoryId} category={category} />
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  )
}
