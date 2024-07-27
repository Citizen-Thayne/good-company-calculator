import { ProductItem } from "../lib/items";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

export function ProductCard(props: { product: ProductItem }) {
  return <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>
        <div className="flex justify-between">
          <div>{props.product.name}</div>
          <Button size='sm' variant='outline'>Edit</Button>
        </div>
      </CardTitle>
      <CardContent className="px-0">
        <div className="flex justify-between">
          <div>
            <Label className="font-semibold">Assemby Time</Label>
            <div className="">{props.product.craftTime.toFixed(2)}</div>
          </div>
          <div>
            <Label className="font-semibold">Type</Label>
            <div className="">{props.product.productType}</div>
          </div>
        </div>

        <div className="flex-col"><Label className="font-semibold">Ingredients</Label>
          {props.product.recipe.map((item) => {
            return <div>
              {item.name}
            </div>
          })}
        </div>

      </CardContent>
    </CardHeader>
  </Card >
}