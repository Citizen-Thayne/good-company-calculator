'use client'
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button } from "./ui/button";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { COMPONENT_NAMES, Item, PRODUCT_TYPES, ProductItem } from "../lib/items";
import { useContext, useState } from "react";
import { UserProductsContext } from "../lib/userProductsContext";
import { DialogClose } from "@radix-ui/react-dialog";
import { Value } from "@radix-ui/react-select";
import { ProductCard } from "./productCard";
import { Separator } from "./ui/separator";


export function ProductSection() {
  const { state: { products }, dispatch } = useContext(UserProductsContext)
  const [showNewProduct, setShowNewProduct] = useState(false)

  return (
    <section>
      <h2>Products</h2>

      <div>
        {products.map((product) => {
          return <ProductCard key={product.name} product={product} />
        })}
      </div>

      <Dialog onOpenChange={setShowNewProduct} open={showNewProduct}>
        <DialogTrigger>
          <Button>+ Add Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm onSubmit={(product) => {
            dispatch({ type: 'ADD_PRODUCT', product })
            setShowNewProduct(false)
          }} />

          <DialogClose className="flex flex-col items-stretch" >

          </DialogClose>

        </DialogContent>
      </Dialog>


    </section>
  )
}



function ProductForm(props: { value?: ProductItem, onSubmit?: (product: ProductItem) => void }) {
  const form = useForm<ProductItem>({
    values: props.value,
    defaultValues: {
      craftTime: 1,
      craftBatchSize: 1,
      sellPrice: 1,
      stackSize: 1,
      category: 'Product',
      name: 'My Product',
      productType: 'Calculator',
      recipe: []
    },
  })

  const recipeFields = useFieldArray({
    control: form.control,
    name: 'recipe'
  })


  const handleSubmit = (data: ProductItem) => {
    props.onSubmit?.(data)
  }

  return <Form {...form}  >
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_TYPES.map(productType => {
                      return <SelectItem value={productType} key={productType}>{productType}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='assemblyTime'
          key='assemblyTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Craft Time (in Days)</FormLabel>
              <FormControl>
                <Input  {...field} type="number" step="0.01" defaultValue={1.00} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Recipe</FormLabel>
        {recipeFields.fields.map((field, index) => (
          <div className='flex items-baseline' key={field.id}>
            {/* Ingredient name */}
            <FormField
              key={field.id}
              {...form.register(`recipe.${index}.name`)}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPONENT_NAMES.map(component =>
                          <div key={component}>
                            <SelectItem value={component} key={component} >{component}</SelectItem>
                          </div>
                        )}
                      </SelectContent>
                    </Select>

                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mx-2">X</div>

            {/* Igredient Count */}
            <FormField
              key={field.id}
              {...form.register(`recipe.${index}.count`)}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" step="1"  {...field} className="w-[72px]" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="ml-1" variant='link' onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              recipeFields.remove(index)
            }}>Remove</Button>

          </div>
        ))}

        <Button onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          recipeFields.append({ name: 'Plastic Case', count: 1 })
        }}>+ Add Ingredient</Button>

        <Separator />

        <Button className="mt-6" type='submit'>Save</Button>
      </div>
    </form>
  </Form>
}
