import { Separator } from "~/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Alert, AlertDescription } from "~/components/ui/alert"
import { Info } from 'lucide-react'
import type { ProductDetailResponse } from "~/services/products"

interface ProductIngredientsProps {
  product: ProductDetailResponse // Using any for now, would be properly typed in a real app
}

export default function ProductIngredients({ product }: ProductIngredientsProps) {
  return (
    <div className="space-y-8">
      {/* Nutrition Facts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Nutrition Facts</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient</TableHead>
              <TableHead>Amount Per Serving</TableHead>
              <TableHead>% Daily Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.nutritionalFacts.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableRow key={index}>
                <TableCell className="font-medium">{item.ingredient}</TableCell>
                <TableCell>{item.amountPerServing}</TableCell>
                <TableCell>{item.percentDailyValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-sm text-muted-foreground">
          * Percent Daily Values are based on a 2,000 calorie diet.
        </p>
      </div>

      <Separator />

      {/* Other Ingredients */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Other Ingredients</h2>
        {product.otherIngredients ? (
          <div className="prose max-w-none">
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
            <div dangerouslySetInnerHTML={{ __html: product.otherIngredients }} />
          </div>
        ) : (
          <p>No other ingredients information available.</p>
        )}
      </div>

      <Separator />

      {/* Allergen Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Allergen Information</h2>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            {/* {product} */}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
