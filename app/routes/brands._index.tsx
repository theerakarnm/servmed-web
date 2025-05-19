import { useLoaderData, useSearchParams } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { getBrands } from "~/data/brand"
import BrandCard from "~/components/brand-card"
import { Input } from "~/components/ui/input"
import Wrapper from "~/layouts/Wrapper"

export async function loader({ request }: LoaderFunctionArgs) {
  const brands = await getBrands()
  return { brands }
}

export default function BrandsPage() {
  const { brands } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = (searchParams.get("q") || "").toLowerCase()
  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(query)
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      setSearchParams({ q: value })
    } else {
      setSearchParams({})
    }
  }

  return (
    <Wrapper>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Brands</h1>
        <div className="max-w-md mx-auto mb-8">
          <Input
            type="search"
            placeholder="Search brands..."
            value={searchParams.get("q") || ""}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filtered.map((brand) => (
            <BrandCard key={brand.brandId} brand={brand} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">No brands found.</p>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
