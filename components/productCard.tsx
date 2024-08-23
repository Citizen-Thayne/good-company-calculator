import { useState } from "react";
import { ProductItem } from "../lib/items/types";
import { ProductForm } from "./productForm";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

export function ProductCard(props: {
  product: ProductItem;
  onUpdate: (product: ProductItem) => void;
}) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <div>{props.product.name}</div>
            <Dialog open={showUpdateForm} onOpenChange={setShowUpdateForm}>
              <DialogTrigger>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit {props.product.name}</DialogTitle>
                </DialogHeader>

                <ProductForm
                  onSubmit={(product) => {
                    props.onUpdate(product);
                    setShowUpdateForm(false);
                  }}
                />
              </DialogContent>
            </Dialog>
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

          <div className="flex-col">
            <Label className="font-semibold">Ingredients</Label>
            {props.product.recipe.map((item) => {
              return <div key={item.name}>{item.name}</div>;
            })}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
