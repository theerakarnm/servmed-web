import { Form, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import ProductCard from "~/components/product-card";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import Wrapper from "~/layouts/Wrapper";
import { getAllProducts, type Product } from "~/data/product";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.toLowerCase() || "";
  const brandValue = url.searchParams.get("brand")?.toLowerCase() ?? "all";
  const sortValue = url.searchParams.get("sort") ?? "default";

  const brand = brandValue === "all" ? "" : brandValue;
  const sort = sortValue === "default" ? "" : sortValue;

  let products = await getAllProducts();
  const brands = Array.from(new Set(products.map(p => p.brandName).filter(Boolean))) as string[];

  if (q) {
    products = products.filter(
      p => p.name.toLowerCase().includes(q) || (p.brandName?.toLowerCase() ?? "").includes(q)
    );
  }

  if (brand) {
    products = products.filter(p => p.brandName?.toLowerCase() === brand);
  }

  switch (sort) {
    case "price-asc":
      products.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;
    case "price-desc":
      products.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case "rating-asc":
      products.sort((a, b) => (a.overallRating ?? 0) - (b.overallRating ?? 0));
      break;
    case "rating-desc":
      products.sort((a, b) => (b.overallRating ?? 0) - (a.overallRating ?? 0));
      break;
  }

  return { products, brands, q, brandValue, sortValue };
}

export const meta: MetaFunction<typeof loader> = () => [{
  title: "Products | ServeMed",
}, {
  name: "description",
  content: "Browse all products available on ServeMed.",
}];

export default function ProductsPage() {
  const {
    products,
    brands,
    q,
    brandValue,
    sortValue,
  } = useLoaderData<typeof loader>();

  return (
    <Wrapper>
      <div className="container mx-auto px-4 py-8">
        <Form method="get" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Input
            type="search"
            name="q"
            placeholder="Search products..."
            defaultValue={q}
            className="md:col-span-2"
          />
          <Select name="brand" defaultValue={brandValue}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map(b => (
                <SelectItem key={b} value={b.toLowerCase()}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select name="sort" defaultValue={sortValue}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
              <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Apply</Button>
        </Form>
        {products.length === 0 ? (
          <div className="text-center text-muted-foreground">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <ProductCard key={p.productId} product={p} />
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
