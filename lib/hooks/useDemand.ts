'use client'
import { useContext, useMemo } from "react";
import { UserProductsContext } from "../userProductsContext";
import { ALL_ITEMS, COMPONENT_ITEMS, Craftable, IngredientName, ProductItem, RecipeItem } from "../items/types";

export type DemandItem = {
  name: string
  dailyDemand: number
  weeklyDemand: number
}

type IngredientCost = Partial<Record<IngredientName, number>>

export function useDemand(): DemandItem[] {
  const { state: { products } } = useContext(UserProductsContext)

  return useMemo(() => {

    const fullCost = products.reduce((acc: IngredientCost, product) => {
      return product.recipe
        .map(getRecipeItemCost)
        .reduce(mergeIngredientCost, acc)
    }, {})

    // Object.entries(fullCost).reduce((acc, [name, cost]) => {
    //   const component = COMPONENT_ITEMS.find(i => i.name === name)

    //   if (!component) {
    //     return acc
    //   }

    //   const { craftBatchSize, craftTime } = component

    //   // Daily
    //   const craftRate = craftBatchSize / craftTime


    // }, [])

    return Object.entries(fullCost).reduce((acc: DemandItem[], [name, dailyDemand]) => {
      const demand: DemandItem = {
        name,
        dailyDemand,
        weeklyDemand: dailyDemand * 7
      }
      return [...acc, demand]
    }, [])
  }, [products])
}



function mergeIngredientCost(a: IngredientCost, b: IngredientCost): IngredientCost {
  const allEntries = [...Object.entries(a), ...Object.entries(b)] as [IngredientName, number][]
  return allEntries.reduce((acc: IngredientCost, [key, value]) => {
    const newValue = (acc[key] || 0) + value
    return { ...acc, [key]: newValue }
  }, {})
}

function getRecipeItemCost(item: RecipeItem): IngredientCost {
  const cost = { [item.name]: item.count }
  const recipe = COMPONENT_ITEMS.find(c => c.name === item.name)?.recipe || []


  return recipe.reduce<IngredientCost>((acc, subItem) => {
    const subItemCost = getRecipeItemCost(subItem)
    return mergeIngredientCost(acc, subItemCost)
  }, cost)
}
