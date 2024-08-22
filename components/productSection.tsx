"use client";
import { DialogClose } from "@radix-ui/react-dialog";
import { useContext, useState } from "react";
import { UserProductsContext } from "../lib/userProductsContext";
import { ProductCard } from "./productCard";
import { ProductForm } from "./productForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function ProductSection() {
  const {
    state: { products },
    dispatch,
  } = useContext(UserProductsContext);
  const [showNewProduct, setShowNewProduct] = useState(false);

  return (
    <section className="flex flex-col flex-wrap gap-4 items-start">
      <h2 className="text-3xl">Products</h2>

      <div className="flex gap-2">
        {products.map((product, index) => {
          return (
            <ProductCard
              key={product.name}
              product={product}
              onUpdate={(newValue) => {
                dispatch({ type: "UPDATE_PRODUCT", index, product: newValue });
              }}
            />
          );
        })}
      </div>

      <Dialog onOpenChange={setShowNewProduct} open={showNewProduct}>
        <DialogTrigger asChild>
          <Button>+ Add Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>

          <ProductForm
            onSubmit={(product) => {
              dispatch({ type: "ADD_PRODUCT", product });
              setShowNewProduct(false);
            }}
          />

          <DialogClose className="flex flex-col items-stretch" asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </section>
  );
}
